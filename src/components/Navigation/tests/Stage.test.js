import React from 'react';
import { shallow } from 'enzyme';

import Stage, { HourGlassIcon, LockedIcon, CheckIcon } from '../Stage';

import padlock from "../../../icons/padlock.svg";
import clock from '../../../icons/clock.svg';
import { StyledCircle, StyledIconImage, StyledStepContent } from '../styledComponents';
import Navigation from "../index";
import Step from "../Step";

//  TODO: May want to consider checking to verify that the Step is a child of Steps;

const CustomInProgress = () =>
  <img
    alt="In Progress"
    className="animated fadeIn"
    style={{ width: '30px'}}
    src={clock}
    data-test-id="customInProgressIcon"
  />;
const CustomLocked = (text) =>
  <div>
    {text}
    <img
      alt="Locked"
      className="animated fadeIn"
      style={{ width: '15px'}}
      src={padlock}
      data-test-id="customLockedIcon"
      />
  </div>;
const CustomCompleted = () =>
  <img
    alt="Completed"
    className="animated
    fadeIn" style={{ width: '12px'}}
    src={clock}
    data-test-id="customCompletedIcon"
  />;

  const WrappedIcon = ({ check, completed, inProgress }) => {
  if(inProgress) {
    return <CustomInProgress />;
  }

  if(completed) {
    return <CustomCompleted />;
  }

  return <CustomLocked />;
};

describe('Navigation -> Stage Component', () => {
  describe('should render', () => {
    it('without error', () => {
      const component = shallow(<Stage/>);

      expect(component.exists()).toEqual(true);

      const styledCircle = component.find(StyledCircle);
      expect(styledCircle.exists()).toEqual(true);
    });

    describe('when components are passed', () => {
      describe('as children', () => {
        it('should render children', () => {
          const component = shallow(
            <Stage>
              <div data-test-id="testChild" />
            </Stage>
          );

          expect(component.exists()).toEqual(true);

          const stageContent = component.find(StyledCircle);
          expect(stageContent.exists()).toEqual(true);

          const testChild = component.find('[data-test-id="testChild"]');
          expect(testChild.exists()).toEqual(true);
        });

        it('should render children of children', () => {
          const component = shallow(
            <Stage>
              <div data-test-id="testChild">
                <div data-test-id="grandChild1" />
                <div data-test-id="grandChild2" />
                <div data-test-id="grandChild3" />
              </div>
            </Stage>
          );

          expect(component.exists()).toEqual(true);

          const stageContent = component.find(StyledCircle);
          expect(stageContent.exists()).toEqual(true);

          const testChild = component.find('[data-test-id="testChild"]');
          const grandChild1 = component.find('[data-test-id="grandChild1"]');
          const grandChild2 = component.find('[data-test-id="grandChild1"]');
          const grandChild3 = component.find('[data-test-id="grandChild1"]');

          expect(testChild.exists()).toEqual(true);
          expect(grandChild1.exists()).toEqual(true);
          expect(grandChild2.exists()).toEqual(true);
          expect(grandChild3.exists()).toEqual(true);
        });

        it('should forward props to children', () => {
          const TestComponent = () => <div data-test-id="testChild" />;
          const props = { children: undefined, completed: false, inProgress: true, transition: "transition" };

          const component = shallow(
            <Stage {...props}>
              <TestComponent />
            </Stage>
        );

          expect(component.exists()).toEqual(true);

          const stageContent = component.find(StyledStepContent);
          expect(stageContent.exists()).toEqual(false);

          const testChild = component.find(TestComponent);
          expect(testChild.exists()).toEqual(true);
          expect(testChild.props()).toEqual(props);
        });
      });

      describe('as function child', () => {
        it('should render children', () => {
          let props = [];

          const component = shallow(
            <Stage navigationId="1" currentNavigationId="1" transition="transition">
              {
                (...passedProps) => {
                  props = passedProps;
                  return <div data-test-id="testChild" />
                }
              }
            </Stage>
          );

          expect(component.exists()).toEqual(true);

          const stageContent = component.find(StyledStepContent);
          expect(stageContent.exists()).toEqual(false);

          const [completed, shouldRender, transition] = props;

          expect(completed).toBe(false);
          expect(shouldRender).toBe(true);
          expect(transition).toEqual('transition');

          const testChild = component.find('[data-test-id="testChild"]');
          expect(testChild.exists()).toEqual(true);
        });

        it('should forward props to children', () => {
          const TestComponent = () => <div data-test-id="testChild" />;
          const props = { completed: false, shouldRender: true, transition: "transition" };
          const component = shallow(
            <Stage navigationId="1" currentNavigationId="1" transition="transition">
              {
                (completed, shouldRender, transition) => (
                  <TestComponent completed={completed} shouldRender={shouldRender} transition={transition}/>
                )
              }
            </Stage>
        );

          expect(component.exists()).toEqual(true);

          const stageContent = component.find(StyledStepContent);
          expect(stageContent.exists()).toEqual(false);

          const testChild = component.find(TestComponent);
          expect(testChild.exists()).toEqual(true);
          expect(testChild.props()).toEqual(props);
        });
      });

      describe('as component prop', () => {
        it('should render component', () => {
          const TestComponent = () => <div data-test-id="testChild" />;
          const component = shallow(<Step component={TestComponent} />);

          expect(component.exists()).toEqual(true);

          const stageContent = component.find(StyledStepContent);
          expect(stageContent.exists()).toEqual(true);

          const testComponent = component.find(TestComponent);
          expect(testComponent.exists()).toEqual(true);
        });

        it('should forward props to children', () => {
          const TestComponent = () => <div data-test-id="testChild" />;
          const props = { currentNavigationId: "1", navigationId: "1", transition:"transition" };
          const component = shallow(<Step component={TestComponent} {...props} />);

          expect(component.exists()).toEqual(true);

          const stageContent = component.find(StyledStepContent);
          expect(stageContent.exists()).toEqual(true);

          const testChild = component.find(TestComponent);
          expect(testChild.exists()).toEqual(true);
          expect(testChild.props()).toEqual(props);
        });
      });

      describe('using render prop', () => {
        it('should render component', () => {
          const TestComponent = () => <div />;
          const component = shallow(
            <Step render={
              () => <TestComponent data-test-id="testChild" />
            }/>
          );

          expect(component.exists()).toEqual(true);
          const testComponent = component.find('[data-test-id="testChild"]');
          expect(testComponent.exists()).toEqual(true);
        });
      });

      it('should forward props to children', () => {
        const TestComponent = () => <div data-test-id="testChild" />;
        const props = { completed: false, shouldRender: true, transition: "transition" };
        const component = shallow(
          <Stage
            navigationId="1"
            currentNavigationId="1"
            transition="transition"
            render={
              (completed, shouldRender, transition) =>
                <TestComponent completed={completed} shouldRender={shouldRender} transition={transition}/>
            }
          />
        );

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStepContent);
        expect(stageContent.exists()).toEqual(false);

        const testChild = component.find(TestComponent);
        expect(testChild.exists()).toEqual(true);
        expect(testChild.props()).toEqual(props);
        expect(testChild.prop('shouldRender')).toEqual(true);
        expect(testChild.prop('completed')).toEqual(false);
        expect(testChild.prop('transition')).toEqual('transition');
      });
    });

    describe('when currentNavigationId === navigationId', () => {
      it('inProgress icon as default', () => {
        const component = shallow(<Stage navigationId='1' currentNavigationId='1'/>);

        expect(component.exists()).toEqual(true);

        const styledCircle = component.find(StyledCircle);
        expect(styledCircle.exists()).toEqual(true);

        const lockedIcon = component.find('[data-test-id="inProgressIcon"]');
        expect(lockedIcon.exists()).toEqual(true);
      });

      it('custom inProgress icon when passed as prop', () => {
        const component = shallow(<Stage navigationId='1' currentNavigationId='1' customInProgressIcon={CustomInProgress} />);

       expect(component.exists()).toEqual(true);

       const styledCircle = component.find(StyledCircle);
       expect(styledCircle.exists()).toEqual(true);

       const customInProgressIcon = component.prop('children')[1];
       expect(customInProgressIcon).toEqual(CustomInProgress);
      });
    });

    describe('when currentNavigationId !== navigationId', () => {
      it('locked icon as default', () => {
        const navigationId = '2';
        const component = shallow(<Stage navigationId={navigationId} currentNavigationId='1'/>);

        expect(component.exists()).toEqual(true);

        const styledCircle = component.find(StyledCircle);
        expect(styledCircle.exists()).toEqual(true);

        const styledCircleText = styledCircle.text();
        expect(styledCircleText).toEqual(navigationId);

        const lockedIcon = component.find('[data-test-id="lockedIcon"]');
        expect(lockedIcon.exists()).toEqual(true);
      });

      it('locked completed icon when passed as prop', () => {
        const component = shallow(<Stage navigationId='2' currentNavigationId='1' customLockedIcon={CustomLocked} />);

       expect(component.exists()).toEqual(true);

       const styledCircle = component.find(StyledCircle);
       expect(styledCircle.exists()).toEqual(true);

       const customLockedIcon = component.prop('children')[1];
       expect(customLockedIcon).toEqual(CustomLocked);
      });
    });

    describe('when currentNavigationId > navigationId', () => {
      it('completed icon as default', () => {
        const component = shallow(<Stage navigationId='1' currentNavigationId='2'/>);

        expect(component.exists()).toEqual(true);

        const styledCircle = component.find(StyledCircle);
        expect(styledCircle.exists()).toEqual(true);

        const completedIcon = component.find('[data-test-id="completedIcon"]');
        expect(completedIcon.exists()).toEqual(true);
      });

      it('custom completed icon when passed as prop', () => {
        const component = shallow(<Stage navigationId="1" currentNavigationId="2" customCompletedIcon={CustomCompleted} />);

        expect(component.exists()).toEqual(true);

        const styledCircle = component.find(StyledCircle);
        expect(styledCircle.exists()).toEqual(true);

        const customCompletedIcon = component.prop('children')[1];
        expect(customCompletedIcon).toEqual(CustomCompleted);
      });
    });
  });
});
