import React from "react";
import { StyledStageContent } from './styledComponents';

import { isChildFunction, hasChildrenToRender, shouldRenderCurrent } from '../../utils/componentHelpers';
const isFunction = (teste) => typeof teste === 'function';

const Step = (props) => {
  const { currentNavigationId, navigationId, transition, component, render, children } = props;
  const shouldRender = shouldRenderCurrent(currentNavigationId, navigationId);

  const childProps = { currentNavigationId, navigationId, transition };

  if (component) {
    return shouldRender
      ? <StyledStageContent key={navigationId}>
          {React.createElement(component, childProps)}
        </StyledStageContent>
      : null;
  }

  if (render) {
    if(isFunction(render)) {
      if(shouldRender) {
        return render(navigationId, currentNavigationId, transition)
      }
    } else {
      throw "Error: the prop 'render' should only be passed a function";
    }

    return null;
  }

  if (isChildFunction(children)) {
    return shouldRender
      ? children(navigationId, currentNavigationId, transition)
      : null;
  }

  if (hasChildrenToRender(children)) {
    return shouldRender
      ? <StyledStageContent key={navigationId}>
        { React.Children.only(React.cloneElement(children, childProps, children.props.children)) }
        </StyledStageContent>
      : null;
  }

  return null;
};

export default Step;