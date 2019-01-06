import React from "react";
import { StyledStepContent } from './styledComponents';

import { isChildFunction, hasChildrenToRender, shouldRenderCurrent } from '../../utils/componentHelpers';
const isFunction = (teste) => typeof teste === 'function';

const Step = (props) => {
  const { currentNavigationId, navigationId, transition, ids=[], component, render, children } = props;
  const shouldRender = shouldRenderCurrent(currentNavigationId, navigationId);
  const childProps = { currentNavigationId, navigationId, transition, ids };

  if (component) {
    return shouldRender
      ? <StyledStepContent key={navigationId}>
          {React.createElement(component, childProps)}
        </StyledStepContent>
      : null;
  }

  if (render) {
    if(isFunction(render)) {
      if(shouldRender) {
        return render(...Object.values(childProps))
      }
    } else {
      throw "Error: the prop 'render' should only be passed a function";
    }

    return null;
  }

  if (isChildFunction(children)) {
    return shouldRender
      ? children(...Object.values(childProps))
      : null;
  }

  if (hasChildrenToRender(children)) {
    return shouldRender
      ? <StyledStepContent key={navigationId}>
        { React.Children.only(React.cloneElement(children, childProps, children.props.children)) }
        </StyledStepContent>
      : null;
  }

  return null;
};

export default Step;
