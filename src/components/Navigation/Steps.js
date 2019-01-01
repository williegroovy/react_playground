import React from 'react';
import Button from '../Button';
import {
  StyledStageContainer,
  StyledStage,
  StyledButtonStageContainer,
  PrimaryButtonsWrapper,
  BackButtonWrapper
} from './styledComponents';

import NavigationContext from './NavigationContext';

const Steps = ({ children }) => (
  <NavigationContext.Consumer>
    {
      ({ navProperties, currentNavigationId, transition }) => {
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

        return (
          <StyledStageContainer>
            <StyledStage>
              {
                React.Children.map(children, (child) =>
                  React.cloneElement(child, { currentNavigationId, transition },  child.props.children), this)
              }
            </StyledStage>
            <StyledButtonStageContainer hideNavigationUI={hideNavigationUI}>
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
                  disabled={currentNavigationId === 3}
                  onClick={() => transition('forward')}
                  animated
                >
                  {secondaryButtonText}
                </Button>
                <Button
                  hidden={hideForwardButton}
                  buttonType={forwardButtonType}
                  disabled={currentNavigationId === 4}
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

export default Steps;

