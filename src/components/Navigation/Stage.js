import React from 'react';

import HourGlass from '../../animations/HourGlass';
import checked from '../../icons/checked2.svg';
import padlock from '../../icons/padlock.svg';
import { StyledCircle, StyledIconImage } from './styledComponents';
import { hasChildrenToRender, isChildFunction, shouldRenderCurrent } from "../../utils/componentHelpers";

const HourGlassIcon = <HourGlass style={{ animationDuration: 0 }} size="30px" />;
const LockedIcon = (text) => <div><StyledIconImage src={padlock} />{text}</div>
const CheckIcon = <img className="animated fadeIn" style={{ width: '12px'}} src={checked} />;

const getIconToRender = (inProgress, completed, inProgressIcon, completedIcon, lockedIcon) => {
    if (inProgress) {
      return inProgressIcon;
    }

    if (completed) {
      return completedIcon;
    }
    return lockedIcon;
};

const Stage = (props) => {
  const {
    currentNavigationId, navigationId, text,
    customInProgressIcon, customCompletedIcon, customLockedIcon,
    component, render, children
  } = props;
  const shouldRender = shouldRenderCurrent(currentNavigationId, navigationId);
  const completed = currentNavigationId > navigationId;
  console.log('completed', completed);

  if (component) {
    return shouldRender ? React.createElement(component, props) : null;
  }

  if (render) {
    return shouldRender
      ? render(props)
      : null;
  }

  if (isChildFunction(children)) {
    return shouldRender
      ? children(props)
      : null;
  }

  if (hasChildrenToRender(children)) {
    return shouldRender
      ? <StyledCircle current={currentNavigationId} circleSection={navigationId}>
        { React.Children.only(children) }
        </StyledCircle>
      : null;
  }

  const inProgressIcon = customInProgressIcon ? customInProgressIcon : HourGlassIcon;
  const completedIcon = customCompletedIcon ? customCompletedIcon : CheckIcon;
  const lockedIcon = customLockedIcon ? customLockedIcon : LockedIcon(navigationId);
  const StageIcon = getIconToRender(shouldRender, completed, inProgressIcon, completedIcon, lockedIcon);

  return (
    <StyledCircle current={currentNavigationId} circleSection={navigationId}>
      { text }
      { StageIcon }
    </StyledCircle>
  );
};

export default Stage;

/*
  <StyledCircle current={currentNavigationId} circleSection={navigationId}>
    {renderIcon(currentNavigationId, navigationId)}
  </StyledCircle>
 */