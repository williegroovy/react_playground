import React from 'react';
import PropTypes from 'prop-types';
import {
  StepNavigationContainer,
  StepContent,
  StepNavigationFooter,
  ContinueButtonWrapper,
  ContinueButton,
  BackButton
} from './styledComponents';

import Step from './Step';
import SkipStep from './SkipStep';
import customizableProperties from './customizableProperties';

export const StepNavigationDirection = {
  Back: 'back',
  Forward: 'forward'
};

export const StepNavigationContinueButtonType = {
  Primary: 'primary',
  Secondary: 'secondary',
  Ghost: 'secondaryGhost'
};

class StepNavigation extends React.Component {
  /* eslint-disable no-undef */
  static Step = Step;
  static SkipStep = SkipStep;
  static Direction = StepNavigationDirection;
  static ContinueButtonType = StepNavigationContinueButtonType;
  /* eslint-enable */

  constructor(props) {
    super(props);

    this.initialUIState = {
      hideNavigationUI: false,
      hideBackButton: false,
      continueButtonText: 'Continue',
      continueButtonType: StepNavigationContinueButtonType.Primary,
      useSecondaryButton: false,
      secondaryButtonType: StepNavigationContinueButtonType.Secondary,
      secondaryButtonText: ''
    };

    /**
     * onBeforeTranstion: This callback function will be set by the HOC. It will be called with:
     * @param transition {function} - This function will continue with the transition in progress.
     * @param direction {StepNavigationDirection} - Direction of the transtion
     * @param nextActiveIndex {number} - The index we are transitioning to.
     */
    this.onBeforeTransition = null;

    this.state = {
      activeIndex: 0,
      lastTransitionDirection: StepNavigationDirection.Forward,
      ...this.initialUIState
    };

    this.transition = this.transition.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.onContinueButtonClick = this.onContinueButtonClick.bind(this);
    this.onSecondaryButtonClick = this.onSecondaryButtonClick.bind(this);
    this.setCustomProperty = this.setCustomProperty.bind(this);
    this.setOnBeforeTransition = this.setOnBeforeTransition.bind(this);
    this.setOnSecondaryButtonClick = this.setOnSecondaryButtonClick.bind(this);
    this.resetCustomNavigationProperties = this.resetCustomNavigationProperties.bind(this);
  }

  onBackButtonClick() {
    if (typeof this.onBeforeTransition === 'function') {
      this.onBeforeTransition(this.transition.bind(this, StepNavigationDirection.Back), StepNavigationDirection.Back, this.state.activeIndex - 1);
      return;
    }

    this.transition(StepNavigationDirection.Back);
  }

  onContinueButtonClick() {
    if (typeof this.onBeforeTransition === 'function') {
      this.onBeforeTransition(this.transition.bind(this, StepNavigationDirection.Forward), StepNavigationDirection.Forward, this.state.activeIndex + 1);
      return;
    }

    this.transition(StepNavigationDirection.Forward);
  }

  onSecondaryButtonClick() {
    if (typeof this.handleSecondaryButtonClick === 'function') {
      this.handleSecondaryButtonClick(this.transition, this.state.activeIndex);
      return;
    }

    this.transition(StepNavigationDirection.Forward);
  }

  setCustomProperty(customProperty, value) {
    if (!customizableProperties[customProperty]) {
      console.warn(`StepNavigation: Invalid custom property '${customProperty} passed in configuration object.`);
      return;
    }

    this.setState({
      [customizableProperties[customProperty]]: value
    });
  }

  setOnBeforeTransition(setOnBeforeTransitionCallback) {
    this.onBeforeTransition = setOnBeforeTransitionCallback;
  }

  setOnSecondaryButtonClick(setOnSecondaryButtonCallback) {
    this.handleSecondaryButtonClick = setOnSecondaryButtonCallback;
  }

  transition(direction) {
    let { activeIndex } = this.state;

    switch (direction) {
      case StepNavigationDirection.Forward: activeIndex += 1; break;
      case StepNavigationDirection.Back: activeIndex -= 1; break;
      default: {
        console.warn('StepNavigation: Invalid direction param passed to transition method.');
        return;
      }
    }

    this.resetCustomNavigationProperties();

    this.setState({ activeIndex, lastTransitionDirection: direction });

    if (typeof this.props.onTransition === 'function') {
      this.props.onTransition(activeIndex, direction);
    }
  }

  resetCustomNavigationProperties() {
    this.setState({ ...this.initialUIState });
    // TODO: Add unit test to check if this is being reset correctly
    this.onBeforeTransition = null;
  }

  render() {
    if (this.props.children.length < 1) return null;

    const customNavigationProps = {
      stepNavigation: {
        setCustomProperty: this.setCustomProperty,
        setOnBeforeTransition: this.setOnBeforeTransition,
        setOnSecondaryButtonClick: this.setOnSecondaryButtonClick,
        resetCustomNavigationProperties: this.resetCustomNavigationProperties
      }
    };

    const childProps = {
      transition: this.transition,
      lastTransitionDirection: this.state.lastTransitionDirection,
      customNavigationProps
    };

    const children = React.Children.map(this.props.children, (child, index) => {
      return index === this.state.activeIndex && React.cloneElement(child, childProps);
    });

    const {
      continueButtonType, continueButtonText,
      hideNavigationUI, hideBackButton,
      secondaryButtonType, secondaryButtonText, useSecondaryButton
    } = this.state;

    return (
      <StepNavigationContainer>
        <StepContent>
          {children}
        </StepContent>
        {
          !hideNavigationUI && (
            <StepNavigationFooter>
                <ContinueButtonWrapper>
                  {
                    useSecondaryButton &&
                    <ContinueButton buttonType={secondaryButtonType} onClick={this.onSecondaryButtonClick} data-automation-id="navigation_secondaryButton">
                      {secondaryButtonText}
                    </ContinueButton>
                  }
                  <ContinueButton buttonType={continueButtonType} onClick={this.onContinueButtonClick} data-automation-id="navigation_continueButton">
                    {continueButtonText}
                  </ContinueButton>
                </ContinueButtonWrapper>
              {
                !hideBackButton && <BackButton onClick={this.onBackButtonClick} />
              }

            </StepNavigationFooter>
          )
        }
      </StepNavigationContainer>
    );
  }
}

StepNavigation.propTypes = {
  children: PropTypes.any,
  onTransition: PropTypes.func
};

StepNavigation.defaultProps = {
  children: []
};

export default StepNavigation;
