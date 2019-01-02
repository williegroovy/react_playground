import React from 'react';
import NavigationContext from './NavigationContext';
import { StyledProgressContainer } from './styledComponents';
import { isChildFunction } from '../../utils/componentHelpers';

const Progress = ({ children }) => (
  <NavigationContext.Consumer>
    {
      ({ currentNavigationId, transition }) => (
        isChildFunction(children)
          ? children(currentNavigationId, transition)
          : <StyledProgressContainer>
            {
              React.Children.map(children, (child) =>
                React.cloneElement(child, { currentNavigationId, transition }, child.props.children), this)
            }
            </StyledProgressContainer>
      )
    }
  </NavigationContext.Consumer>
);

export default Progress;