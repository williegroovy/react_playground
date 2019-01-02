import React from 'react';
import { shallow, mount } from 'enzyme';
import StepNavigation, { StepNavigationContinueButtonType } from '../StepNavigation';
import withCustomNavigation from '../withCustomNavigation';
import { ContinueButton, BackButton, StepNavigationFooter } from '../styledComponents';

const TestComponent = () => <div>I AM TEST</div>;
const SecondTestComponent = () => <div />;

describe.skip('Navigation component', () => {
  it('should not render any elements if no children was provided', () => {
    const component = shallow(<StepNavigation />);

    expect(component.exists()).toEqual(true);
    expect(component.children().length).toEqual(0);
  });

  describe('when children are passed down to the component', () => {
    it('should render a continue and back buttons at the bottom', () => {
      const component = shallow(
        <StepNavigation>
          <StepNavigation.Step component={TestComponent} />
        </StepNavigation>
      );

      expect(component.exists()).toEqual(true);

      const continueButton = component.find(ContinueButton);
      const backButton = component.find(BackButton);

      expect(continueButton.exists()).toEqual(true);
      expect(backButton.exists()).toEqual(true);
    });

    describe('and customProperties passed through withCustomNavigation', () => {
      let StepNavigationComponentWithoutBack;
      let StepNavigationComponentWithSecondary;

      beforeEach(() => {
        class StepNavigationCustomPropertiesComponent extends React.Component {
          constructor(props) {
            super(props);
          }

          render() {
            return <div>I'M CHANGING BUTTON TEXT</div>;
          }
        }

        StepNavigationComponentWithoutBack = withCustomNavigation(StepNavigationCustomPropertiesComponent,
          { hideBackButton: true}
        );

        StepNavigationComponentWithSecondary = withCustomNavigation(StepNavigationCustomPropertiesComponent,
          {
            useSecondaryButton: true,
            secondaryButtonText: 'Secondary',
            secondaryButtonType: StepNavigationContinueButtonType.Secondary
          }
        );
      });

      it('should not render back button at the bottom when hideBackButton is true', () => {
        const component = mount(
          <StepNavigation>
            <StepNavigation.Step component={StepNavigationComponentWithoutBack} />
          </StepNavigation>
        );

        expect(component.exists()).toEqual(true);

        const continueButton = component.find(ContinueButton);
        const backButton = component.find(BackButton);
        const secondaryButton = component.find('[data-automation-id="navigation_secondaryButton"]');

        expect(continueButton.exists()).toEqual(true);
        expect(backButton.exists()).toEqual(false);
        expect(secondaryButton.exists()).toEqual(false);
      });

      it('should render a secondary button at the bottom when useSecondaryButton is true', () => {
        const component = mount(
          <StepNavigation>
            <StepNavigation.Step component={StepNavigationComponentWithSecondary} />
          </StepNavigation>
        );

        expect(component.exists()).toEqual(true);

        const continueButton = component.find(ContinueButton);
        const backButton = component.find(BackButton);
        const secondaryButton = component.find('[data-automation-id="navigation_secondaryButton"]');

        expect(continueButton.exists()).toEqual(true);
        expect(backButton.exists()).toEqual(true);
        expect(secondaryButton.exists()).toEqual(true);
      });
    });

    it('should not render anything for an empty Step component', () => {
      const component = mount(
        <StepNavigation>
          <StepNavigation.Step />
        </StepNavigation>
      );

      const firstStep = component.find(TestComponent);

      expect(firstStep.exists()).toEqual(false);
    });

    it('should render the first Step component found in the children', () => {
      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={TestComponent} />
          <StepNavigation.Step component={SecondTestComponent} />
        </StepNavigation>
      );

      const firstStep = component.find(TestComponent);
      const secondStep = component.find(SecondTestComponent);

      expect(firstStep.exists()).toEqual(true);
      expect(secondStep.exists()).toEqual(false);
    });
  });

  describe('when the continue button is clicked', () => {
    let component;

    beforeEach(() => {
      component = mount(
        <StepNavigation>
          <StepNavigation.Step component={TestComponent} />
          <StepNavigation.Step component={SecondTestComponent} />
        </StepNavigation>
      );
    });

    it('should render the next Step component', () => {
      const continueButton = component.find(ContinueButton);

      continueButton.simulate('click');

      const secondStep = component.find(SecondTestComponent);

      expect(secondStep.exists()).toEqual(true);
    });
  });

  describe('when the back button is clicked', () => {
    let component;

    beforeEach(() => {
      component = mount(
        <StepNavigation>
          <StepNavigation.Step component={TestComponent} />
          <StepNavigation.Step component={SecondTestComponent} />
        </StepNavigation>
      );

      component.setState({ activeIndex: 1 });
    });

    it('should render the previous component ', () => {
      const backButton = component.find(BackButton);

      backButton.simulate('click');

      const firstStep = component.find(TestComponent);

      expect(firstStep.exists()).toEqual(true);
    });
  });

  describe('when Step component children are using render prop', () => {
    it('should render the component return from render prop', () => {
      const component = mount(
        <StepNavigation>
          <StepNavigation.Step render={() => <TestComponent />} />
        </StepNavigation>
      );

      const firstStep = component.find(TestComponent);

      expect(firstStep.exists()).toEqual(true);
    });

    describe('when render prop returns a SkipStep component', () => {
      it('should skip a step and render the next one', () => {
        const ThirdTestComponent = () => <div>I AM THIRD</div>;

        const component = mount(
          <StepNavigation>
            <StepNavigation.Step component={TestComponent} />
            <StepNavigation.Step
              render={() => {
                // eslint-disable-next-line
                if (false) {
                  return <SecondTestComponent />;
                }

                return <StepNavigation.SkipStep />;
              }}
            />
            <StepNavigation.Step component={ThirdTestComponent} />
          </StepNavigation>
        );

        expect(component.find(TestComponent).exists()).toEqual(true);

        const continueButton = component.find(ContinueButton);
        continueButton.simulate('click');

        expect(component.find(SecondTestComponent).exists()).toEqual(false);
        expect(component.find(ThirdTestComponent).exists()).toEqual(true);
      });

      it('should skip a step and render the previous one', () => {
        const ThirdTestComponent = () => <div>I AM THIRD</div>;

        const component = mount(
          <StepNavigation>
            <StepNavigation.Step component={TestComponent} />
            <StepNavigation.Step
              render={() => {
                // eslint-disable-next-line
                if (false) {
                  return <SecondTestComponent />;
                }

                return <StepNavigation.SkipStep />;
              }}
            />
            <StepNavigation.Step component={ThirdTestComponent} />
          </StepNavigation>
        );

        component.setState({ activeIndex: 2 });

        expect(component.find(ThirdTestComponent).exists()).toEqual(true);

        const backButton = component.find(BackButton);
        backButton.simulate('click');

        expect(component.find(SecondTestComponent).exists()).toEqual(false);
        expect(component.find(TestComponent).exists()).toEqual(true);
      });
    });
  });

  describe('when children needs to change the text in the continue button', () => {
    it('should change text in continue button', () => {
      const customContinueButtonText = 'Custom Continue';
      const WrappedTestComponent = withCustomNavigation(TestComponent, {
        continueButtonText: customContinueButtonText
      });

      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={WrappedTestComponent} />
        </StepNavigation>
      );

      const continueButton = component.find(ContinueButton);

      expect(continueButton.text()).toEqual(customContinueButtonText);
    });
  });

  describe('when children needs to change the continue button type', () => {
    it('should change the IDS button type', () => {
      const newButtonType = 'secondary';
      const WrappedTestComponent = withCustomNavigation(TestComponent, {
        continueButtonType: newButtonType
      });

      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={WrappedTestComponent} />
        </StepNavigation>
      );

      const continueButton = component.find(ContinueButton);

      expect(continueButton.prop('buttonType')).toEqual(newButtonType);
    });
  });

  describe('when children needs to hide the navigation UI', () => {
    it('should hide the navigation buttons', () => {
      const WrappedTestComponent = withCustomNavigation(TestComponent, {
        hideNavigationUI: true
      });

      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={WrappedTestComponent} />
        </StepNavigation>
      );

      const navigationFooter = component.find(StepNavigationFooter);
      const continueButton = component.find(ContinueButton);
      const backButton = component.find(BackButton);

      expect(navigationFooter.exists()).toEqual(false);
      expect(continueButton.exists()).toEqual(false);
      expect(backButton.exists()).toEqual(false);
    });
  });

  describe('when children needs to manually manage transitions', () => {
    let NavigationTestComponent;
    let onBeforeTransitionSpy;
    let onSecondaryButtonClickSpy;
    let WrappedStepNavigationTestComponent;
    let WrappedStepNavigationTestComponentWithSecondary;

    beforeEach(() => {
      // eslint-disable-next-line react/no-multi-comp
      class StepNavigationTestComponent extends React.Component {
        constructor(props) {
          super(props);
        }

        onSecondaryButtonClick() {

        }

        beforeTransition() {
          // Let's do something
          // eslint-disable-next-line react/prop-types
          this.props.testFunction();
        }

        render() {
          return <div>I'M CHANGING BUTTON TEXT</div>;
        }
      }

      NavigationTestComponent = StepNavigationTestComponent;
      onBeforeTransitionSpy = jest.spyOn(StepNavigationTestComponent.prototype, 'beforeTransition');
      onSecondaryButtonClickSpy = jest.spyOn(StepNavigationTestComponent.prototype, 'onSecondaryButtonClick');

      WrappedStepNavigationTestComponent = withCustomNavigation(NavigationTestComponent, null, {
        onBeforeTransition: 'beforeTransition'
      });

      WrappedStepNavigationTestComponentWithSecondary = withCustomNavigation(NavigationTestComponent,
        {
          useSecondaryButton: true,
          secondaryButtonText: 'Secondary',
          secondaryButtonType: StepNavigationContinueButtonType.Secondary
        },
        {
          onSecondaryButtonClick: 'onSecondaryButtonClick'
        });
    });

    it('should bind callback to the component instance', () => {
      const testFunctionProp = jest.fn();

      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={WrappedStepNavigationTestComponent} testFunction={testFunctionProp} />
          <StepNavigation.Step component={TestComponent} />
        </StepNavigation>
      );

      const continueButton = component.find(ContinueButton);
      continueButton.simulate('click');

      expect(onBeforeTransitionSpy).toHaveBeenCalledWith(expect.any(Function), StepNavigation.Direction.Forward, 1);

      expect(testFunctionProp).toHaveBeenCalled();
    });

    it('should not transition to the next step on Continue button click', () => {
      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={WrappedStepNavigationTestComponent} testFunction={jest.fn()} />
          <StepNavigation.Step component={TestComponent} />
        </StepNavigation>
      );

      const continueButton = component.find(ContinueButton);
      continueButton.simulate('click');

      expect(onBeforeTransitionSpy).toHaveBeenCalledWith(expect.any(Function), StepNavigation.Direction.Forward, 1);

      const firstStep = component.find(NavigationTestComponent);
      const secondStep = component.find(TestComponent);

      expect(firstStep.exists()).toEqual(true);
      expect(secondStep.exists()).toEqual(false);
    });

    it('should transition to next step after callback on Continue button click', () => {
      NavigationTestComponent.prototype.beforeTransition = (transition) => {
        transition();
      };

      onBeforeTransitionSpy = jest.spyOn(NavigationTestComponent.prototype, 'beforeTransition');

      WrappedStepNavigationTestComponent = withCustomNavigation(NavigationTestComponent, null, {
        onBeforeTransition: 'beforeTransition'
      });

      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={WrappedStepNavigationTestComponent} testFunction={jest.fn()}/>
          <StepNavigation.Step component={TestComponent} />
        </StepNavigation>
      );

      const continueButton = component.find(ContinueButton);
      continueButton.simulate('click');

      expect(onBeforeTransitionSpy).toHaveBeenCalledWith(expect.any(Function), StepNavigation.Direction.Forward, 1);

      const firstStep = component.find(NavigationTestComponent);
      const secondStep = component.find(TestComponent);

      expect(firstStep.exists()).toEqual(false);
      expect(secondStep.exists()).toEqual(true);
    });

    it('should transition to next step after callback on Secondary button click', () => {
      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={WrappedStepNavigationTestComponentWithSecondary} testFunction={jest.fn()} />
          <StepNavigation.Step component={TestComponent} />
        </StepNavigation>
      );

      const secondaryButton = component.find('[data-automation-id="navigation_secondaryButton"]');
      secondaryButton.simulate('click');

      expect(onSecondaryButtonClickSpy).toHaveBeenCalledWith(expect.any(Function), 0);

      const firstStep = component.find(NavigationTestComponent);
      const secondStep = component.find(TestComponent);

      expect(firstStep.exists()).toEqual(true);
      expect(secondStep.exists()).toEqual(false);
    });

    it('should not transition to previous step on Back button click', () => {
      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={TestComponent} />
          <StepNavigation.Step component={WrappedStepNavigationTestComponent} testFunction={jest.fn()} />
        </StepNavigation>
      );

      component.setState({activeIndex: 1});

      const backButton = component.find(BackButton);
      backButton.simulate('click');

      expect(onBeforeTransitionSpy).toHaveBeenCalledWith(expect.any(Function), StepNavigation.Direction.Back, 0);

      const secondStep = component.find(NavigationTestComponent);
      const firstStep = component.find(TestComponent);

      expect(firstStep.exists()).toEqual(false);
      expect(secondStep.exists()).toEqual(true);
    });

    it('should transition to previous step after callback on Back button click', () => {
      NavigationTestComponent.prototype.beforeTransition = (transition) => {
        transition();
      };

      onBeforeTransitionSpy = jest.spyOn(NavigationTestComponent.prototype, 'beforeTransition');

      const component = mount(
        <StepNavigation>
          <StepNavigation.Step component={TestComponent} />
          <StepNavigation.Step component={WrappedStepNavigationTestComponent} />
        </StepNavigation>
      );

      component.setState({ activeIndex: 1 });

      const backButton = component.find(BackButton);
      backButton.simulate('click');

      expect(onBeforeTransitionSpy).toHaveBeenCalledWith(expect.any(Function), StepNavigation.Direction.Back, 0);

      const secondStep = component.find(NavigationTestComponent);
      const firstStep = component.find(TestComponent);

      expect(firstStep.exists()).toEqual(true);
      expect(secondStep.exists()).toEqual(false);
    });

    describe('when onBeforeTransition property is a function', () => {
      it('should transition to next step after callback on Continue button click', () => {
        const onBeforeTransition = function onBeforeTransition (transition, direction) {
          expect(transition).toEqual(expect.any(Function));
          expect(direction).toEqual(StepNavigation.Direction.Forward);
          expect(this.props.customProp).toEqual('custom');
          transition();
        };

        WrappedStepNavigationTestComponent = withCustomNavigation(NavigationTestComponent, null, {
          onBeforeTransition
        });

        const component = mount(
          <StepNavigation>
            <StepNavigation.Step component={WrappedStepNavigationTestComponent} customProp="custom" />
            <StepNavigation.Step component={TestComponent} />
          </StepNavigation>
        );

        const continueButton = component.find(ContinueButton);
        expect(continueButton.exists()).toEqual(true);
        continueButton.simulate('click');

        const firstStep = component.find(NavigationTestComponent);
        const secondStep = component.find(TestComponent);

        expect(firstStep.exists()).toEqual(false);
        expect(secondStep.exists()).toEqual(true);
      });

      it('should transition to previous step after callback on Back button click', () => {
        const onBeforeTransition = function onBeforeTransition(transition, direction) {
          expect(transition).toEqual(expect.any(Function));
          expect(direction).toEqual(StepNavigation.Direction.Back);
          transition();
        };

        WrappedStepNavigationTestComponent = withCustomNavigation(NavigationTestComponent, null, {
          onBeforeTransition
        });

        const component = mount(
          <StepNavigation>
            <StepNavigation.Step component={TestComponent} />
            <StepNavigation.Step component={WrappedStepNavigationTestComponent} />
          </StepNavigation>
        );

        component.setState({ activeIndex: 1 });

        const backButton = component.find(BackButton);
        backButton.simulate('click');

        const secondStep = component.find(NavigationTestComponent);
        const firstStep = component.find(TestComponent);

        expect(firstStep.exists()).toEqual(true);
        expect(secondStep.exists()).toEqual(false);
      });
    });

    describe('when navigation transitions out from component with custom navigation', () => {
      it('should reset all customizable properties', () => {
        NavigationTestComponent.prototype.beforeTransition = (transition) => {
          transition();
        };

        onBeforeTransitionSpy = jest.spyOn(NavigationTestComponent.prototype, 'beforeTransition');
        const resetCustomNavigationPropertiesSpy = jest.spyOn(StepNavigation.prototype, 'resetCustomNavigationProperties');

        const component = mount(
          <StepNavigation>
            <StepNavigation.Step component={TestComponent} />
            <StepNavigation.Step component={WrappedStepNavigationTestComponent} />
          </StepNavigation>
        );

        component.setState({ activeIndex: 1 });

        const backButton = component.find(BackButton);
        backButton.simulate('click');

        expect(onBeforeTransitionSpy).toHaveBeenCalledWith(expect.any(Function), StepNavigation.Direction.Back, 0);
        expect(resetCustomNavigationPropertiesSpy).toHaveBeenCalled();

        expect(component.state('continueButtonText')).toEqual('Continue');
        expect(component.state('continueButtonType')).toEqual(StepNavigation.ContinueButtonType.Primary);
        expect(component.instance().onBeforeTransition).toEqual(null);
      });
    });
  });

  describe('when onTransition prop is passed to StepNavigation component', () => {
    let component;
    let onTransition;

    beforeEach(() => {
      onTransition = jest.fn();

      component = mount(
        <StepNavigation onTransition={onTransition}>
          <StepNavigation.Step component={TestComponent} />
          <StepNavigation.Step component={SecondTestComponent} />
        </StepNavigation>
      );
    });

    it('should call the function passed when it has transitioned to the next screen', () => {
      const continueButton = component.find(ContinueButton);
      continueButton.simulate('click');

      expect(onTransition).toHaveBeenCalledWith(1, StepNavigation.Direction.Forward);
    });

    it('should call the function passed when it has transitioned to the previous screen', () => {
      component.setState({ activeIndex: 1 });

      const backButton = component.find(BackButton);
      backButton.simulate('click');

      expect(onTransition).toHaveBeenCalledWith(0, StepNavigation.Direction.Back);
    });
  });
});
