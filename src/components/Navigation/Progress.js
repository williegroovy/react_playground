import React from 'react';
import NavigationContext from './NavigationContext';
import { StyledProgressContainer } from './styledComponents';
import { isChildFunction } from '../../utils/componentHelpers';

const Progress = ({ children }) => (
  <NavigationContext.Consumer>
    {
      ({ currentNavigationId }) => (
        isChildFunction(children)
          ? children(currentNavigationId)
          : <StyledProgressContainer>
            {
              React.Children.map(children, (child) =>
                React.cloneElement(child, { currentNavigationId }, child.props.children), this)
            }
            </StyledProgressContainer>
      )
    }
  </NavigationContext.Consumer>
);

export default Progress;