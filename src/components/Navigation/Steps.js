import React from 'react';
import Button from '../Button';
import {
  StyledStageContainer,
  StyledStage,
  StyledButtonStageContainer
} from './styledComponents';

import NavigationContext from './NavigationContext';

const Steps = ({ children }) => (
  <NavigationContext.Consumer>
    {
      ({ currentNavigationId, onBeforeTransition: navigate }) => (
        <StyledStageContainer>
          <StyledStage>
            {
              React.Children.map(children, (child) =>
                React.cloneElement(child, { currentNavigationId },  child.props.children), this)
            }
          </StyledStage>
          <StyledButtonStageContainer>
            <Button disabled={currentNavigationId === 1} onClick={() => navigate('back')} animated>Back</Button>
            <Button disabled={currentNavigationId === 3} onClick={() => navigate('forward')} animated>Continue</Button>
         </StyledButtonStageContainer>
       </StyledStageContainer>
     )
    }
  </NavigationContext.Consumer>
);

export default Steps;

