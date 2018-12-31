import React from 'react';

import HourGlass from '../../animations/HourGlass';
import checked from '../../icons/checked2.svg';
import padlock from '../../icons/padlock.svg';
import { StyledCircle, StyledIconImage } from './styledComponents';
import { hasChildrenToRender, isChildFunction, shouldRenderCurrent } from "../../utils/componentHelpers";

const HourGlassIcon = <HourGlass style={{ animationDuration: 0 }} size="30px" />;
const LockedIcon = (text) => <div><StyledIconImage src={padlock} />{text}</div>;
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

/*
* Not sure that forcing a lock icons is great.
* Should allow for no-locked Stages to jump to that stage.
* Would need to pass down navigate for that to work.
* In the case of a custom component/function as child, user would need the navigate method passed.
*
 */
const Stage = (props) => {
  const {
    currentNavigationId, navigationId, text, transition,
    customInProgressIcon, customCompletedIcon, customLockedIcon,
    component, render, children
  } = props;

  const shouldRender = shouldRenderCurrent(currentNavigationId, navigationId);
  const completed = currentNavigationId > navigationId;

  if (component) {
    return React.createElement(component, { completed, shouldRender }, component.props.children);
  }

  if (render) {
    return render(completed, shouldRender);
  }

  if (isChildFunction(children)) {
    return children(completed, shouldRender, transition);
  }

  if (hasChildrenToRender(children)) {
    return (
      <StyledCircle current={currentNavigationId} circleSection={navigationId}>
        {
          React.Children.only(
            React.cloneElement(children, { completed, inProgress: shouldRender, transition }, children.props.children)
          )
        }
      </StyledCircle>
    );
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