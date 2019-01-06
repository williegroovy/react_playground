import React from 'react';
import Button from '../Button';
import {
  StyledStageContainer,
  StyledStep,
  StyledButtonStageContainer,
  PrimaryButtonsWrapper,
  BackButtonWrapper
} from './styledComponents';

import NavigationContext from './NavigationContext';

//TODO: Button disables are still hard-coded. Need to fix that.
const Steps = ({ children, hideUI = false }) => {

  const renderChild = (currentNavigationId, transition) => {
    return (
      React.Children.map(children, (child) => {
        return (
          React.cloneElement(child, { currentNavigationId, transition },  child.props.children)
        )
      }, this)
    )
  };

  return (
    <NavigationContext.Consumer>
      {
        ({ navProperties, currentNavigationId, transition, registerNavigationSequence }) => {
          const {
            hideNavigationUI,
            hideBackButton,
            backButtonText,
            backButtonType,
            hideForwardButton,
            forwardButtonText,
            forwardButtonType,
            useSecondaryButton,
            secondaryButtonType,
            secondaryButtonText
          } = navProperties;

          registerNavigationSequence(children);

          return (
            hideUI
              ? renderChild(currentNavigationId, transition)
              : <StyledStageContainer>
                <StyledStep>
                  {
                    renderChild(currentNavigationId, transition)
                  }
                </StyledStep>
                <StyledButtonStageContainer hideNavigationUI={hideNavigationUI || hideUI}>
                  <BackButtonWrapper>
                    <Button
                      hidden={hideBackButton}
                      buttonType={backButtonType}
                      disabled={currentNavigationId === 1}
                      onClick={() => transition('back')}
                    >
                      {backButtonText}
                    </Button>
                  </BackButtonWrapper>
                  <PrimaryButtonsWrapper>
                    <Button
                      hidden={!useSecondaryButton}
                      buttonType={secondaryButtonType}
                      disabled={currentNavigationId === 9}
                      onClick={() => transition('forward')}
                      animated
                    >
                      {secondaryButtonText}
                    </Button>
                    <Button
                      hidden={hideForwardButton}
                      buttonType={forwardButtonType}
                      disabled={currentNavigationId === 9}
                      onClick={() => transition('forward')}
                      animated
                    >
                      {forwardButtonText}
                    </Button>
                  </PrimaryButtonsWrapper>
                </StyledButtonStageContainer>
              </StyledStageContainer>
          )
        }
      }
    </NavigationContext.Consumer>
  );
};

export default Steps;

