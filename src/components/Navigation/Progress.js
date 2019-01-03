import React from 'react';
import NavigationContext from './NavigationContext';
import { StyledProgressContainer } from './styledComponents';
import { isChildFunction } from '../../utils/componentHelpers';

const Progress = ({ children, hideUI }) => {

  const renderChildren = (currentNavigationId, transition) => (
    React.Children.map(children, (child) =>
     React.cloneElement(child, { currentNavigationId, transition }, child.props.children), this)
  );

  return (
    <NavigationContext.Consumer>
      {
        ({currentNavigationId, transition}) => (
          isChildFunction(children)
            ? children(currentNavigationId, transition)
            : hideUI
            ? renderChildren(currentNavigationId, transition)
            : <StyledProgressContainer>
              {
                renderChildren(currentNavigationId, transition)
              }
            </StyledProgressContainer>
        )
      }
    </NavigationContext.Consumer>
  )
};

export default Progress;