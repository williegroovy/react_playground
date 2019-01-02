import React from 'react';
import { shallow } from 'enzyme';

import Step from '../Step';
import { StyledStageContent } from '../styledComponents';

//  TODO: May want to consider checking to verify that the Step is a child of Steps;
describe('Navigation -> Step Component', () => {
  describe('when components are passed', () => {
    describe('as children', () => {
      it('should render children', () => {
        const component = shallow(
          <Step>
            <div data-test-id="testChild" />
          </Step>
        );

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStageContent);
        expect(stageContent.exists()).toEqual(true);

        const testChild = component.find('[data-test-id="testChild"]');
        expect(testChild.exists()).toEqual(true);
      });

      it('should render children of children', () => {
        const component = shallow(
          <Step>
            <div data-test-id="testChild">
              <div data-test-id="grandChild1" />
              <div data-test-id="grandChild2" />
              <div data-test-id="grandChild3" />
            </div>
          </Step>
        );

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStageContent);
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
        const props = { currentNavigationId: "1", navigationId: "1", transition:"transition" };

        const component = shallow(
          <Step {...props}>
            <TestComponent />
          </Step>
      );

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStageContent);
        expect(stageContent.exists()).toEqual(true);

        const testChild = component.find(TestComponent);
        expect(testChild.exists()).toEqual(true);
        expect(testChild.props()).toEqual(props);
      });
    });

    describe('as function child', () => {
      it('should render children', () => {
        const component = shallow(
          <Step>
            {
              () => <div data-test-id="testChild" />
            }
          </Step>
        );

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStageContent);
        expect(stageContent.exists()).toEqual(false);

        const testChild = component.find('[data-test-id="testChild"]');
        expect(testChild.exists()).toEqual(true);
      });

      it('should forward props to children', () => {
        const TestComponent = () => <div data-test-id="testChild" />;
        const props = { currentNavigationId: "1", navigationId: "1", transition:"transition" };
        const component = shallow(
          <Step {...props}>
            {
              (navigationId, currentNavigationId, transition) => {
                return (
                  <TestComponent
                    navigationId={navigationId}
                    currentNavigationId={currentNavigationId}
                    transition={transition}
                  />
                )
              }
            }
          </Step>
      );

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStageContent);
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

        const stageContent = component.find(StyledStageContent);
        expect(stageContent.exists()).toEqual(true);

        const testComponent = component.find(TestComponent);
        expect(testComponent.exists()).toEqual(true);
      });

      it('should forward props to children', () => {
        const TestComponent = () => <div data-test-id="testChild" />;
        const props = { currentNavigationId: "1", navigationId: "1", transition:"transition" };
        const component = shallow(<Step component={TestComponent} {...props} />);

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStageContent);
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
  });

  describe('shouldRender', () => {
    describe('should return true if navigationId === currentNavigationId', () => {
      it('when values are numbers', () => {
        const TestComponent = () => <div data-test-id="testChild" />;
         const props = { navigationId: 1, currentNavigationId: 1 };
         const component = shallow(<Step {...props} component={TestComponent} />);

         expect(component.exists()).toEqual(true);

         const stageContent = component.find(StyledStageContent);
         expect(stageContent.exists()).toEqual(true);

         const testComponent = component.find(TestComponent);
         expect(testComponent.exists()).toEqual(true);
      });

      it('when values are strings', () => {
        const TestComponent = () => <div data-test-id="testChild" />;
         const props = { navigationId: "One", currentNavigationId: "One" };
         const component = shallow(<Step {...props} component={TestComponent} />);

         expect(component.exists()).toEqual(true);

         const stageContent = component.find(StyledStageContent);
         expect(stageContent.exists()).toEqual(true);

         const testComponent = component.find(TestComponent);
         expect(testComponent.exists()).toEqual(true);
      });
    });

    describe('should return false if navigationId !== currentNavigationId', () => {
      it('when values are numbers', () => {
        const TestComponent = () => <div data-test-id="testChild" />;
        const props = { navigationId: 1, currentNavigationId: 2 };
        const component = shallow(<Step {...props} component={TestComponent} />);

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStageContent);
        expect(stageContent.exists()).toEqual(false);

        const testComponent = component.find(TestComponent);
        expect(testComponent.exists()).toEqual(false);
      });

      it('when values are strings', () => {
        const TestComponent = () => <div data-test-id="testChild" />;
        const props = { navigationId: "One", currentNavigationId: "Two" };
        const component = shallow(<Step {...props} component={TestComponent} />);

        expect(component.exists()).toEqual(true);

        const stageContent = component.find(StyledStageContent);
        expect(stageContent.exists()).toEqual(false);

        const testComponent = component.find(TestComponent);
        expect(testComponent.exists()).toEqual(false);
      });
    });
  });
});
