import React from "react";
import { StyledStageContent } from './styledComponents';

import { isChildFunction, hasChildrenToRender, shouldRenderCurrent } from '../../utils/componentHelpers';
const isFunction = (teste) => typeof teste === 'function';


const Step = (props) => {
  const { currentNavigationId, navigationId, transition, component, render, children } = props;
  const shouldRender = shouldRenderCurrent(currentNavigationId, navigationId);

  if (component) {
    return shouldRender
      ? <StyledStageContent key={navigationId}>
          {React.createElement(component, props)}
        </StyledStageContent>
      : null;
  }

  if (render) {
    return shouldRender && isFunction(render)
      ? render(navigationId, currentNavigationId, transition)
      : null;
  }

  if (isChildFunction(children)) {
    return shouldRender
      ? children(navigationId, currentNavigationId, transition)
      : null;
  }

  if (hasChildrenToRender(children)) {
    return shouldRender
      ? <StyledStageContent key={navigationId}>
        { React.Children.only(children) }
        </StyledStageContent>
      : null;
  }

  return null;
};

export default Step;