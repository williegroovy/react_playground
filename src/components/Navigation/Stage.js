import React from 'react';

import HourGlass from '../../animations/HourGlass';
import checked from '../../icons/checked2.svg';
import padlock from '../../icons/padlock.svg';
import { StyledCircle, StyledIconImage } from './styledComponents';
import { hasChildrenToRender, isChildFunction, shouldRenderCurrent } from "../../utils/componentHelpers";

export const HourGlassIcon = <HourGlass data-test-id="inProgressIcon" style={{ animationDuration: 0 }} size="30px" />;

export const CheckIcon =
  <img data-test-id="completedIcon" alt="Completed" className="animated fadeIn" style={{ width: '12px'}} src={checked} />;

export const LockedIcon = (text) =>
  <div style={{ position: 'absolute' }}><StyledIconImage data-test-id="lockedIcon" src={padlock} />{text}</div>;


/*
* Not sure that forcing a lock icons is great.
* Should allow for no-locked Stages to jump to that stage.
* Would need to pass down navigate for that to work.
* In the case of a custom component/function as child, user would need the navigate method passed.
*
 */
const Stage = (props) => {
  const {
    currentNavigationId, navigationId, transition,
    customInProgressIcon, customCompletedIcon, customLockedIcon,
    component, render, children
  } = props;

  const inProgress = shouldRenderCurrent(currentNavigationId, navigationId);
  const completed = currentNavigationId > navigationId;

  const renderSingleReactElementWithProps = (element) => {
    const elementChildren = element.props.children;
    return (
      React.cloneElement(element, { completed, inProgress, transition }, elementChildren)
    )
  };

  if (component) {
    return React.createElement(component, { completed, inProgress: inProgress });
  }

  if (render) {
    return render(completed, inProgress, transition);
  }

  if (isChildFunction(children)) {
    return children(completed, inProgress, transition);
  }

  if (hasChildrenToRender(children)) {
    return (
      <StyledCircle current={currentNavigationId} circleSection={navigationId}>
        {
          renderSingleReactElementWithProps(React.Children.only(children))
        }
      </StyledCircle>
    );
  }

  const getCustomIcon = (status) => {
    if(status === 'inProgress') {
      return React.isValidElement(customInProgressIcon)
        ? renderSingleReactElementWithProps(customInProgressIcon)
        : customInProgressIcon
    }

    if(status === 'completed') {
      return React.isValidElement(customCompletedIcon)
        ? renderSingleReactElementWithProps(customCompletedIcon)
        : customCompletedIcon
    }

    return React.isValidElement(customLockedIcon)
      ? renderSingleReactElementWithProps(customLockedIcon)
      : customLockedIcon
  };

  const inProgressIcon = customInProgressIcon ? getCustomIcon('inProgress') : HourGlassIcon;
  const completedIcon = customCompletedIcon ? getCustomIcon('completed') : CheckIcon;
  const lockedIcon = customLockedIcon ? getCustomIcon('locked') : LockedIcon(navigationId);

  if (inProgress) {
    return customInProgressIcon
    ? inProgressIcon
    : <StyledCircle current={currentNavigationId} circleSection={navigationId}>
        {inProgressIcon}
      </StyledCircle>
  }
  else if (completed) {
    return customCompletedIcon
    ? completedIcon
    : <StyledCircle current={currentNavigationId} circleSection={navigationId}>
        {completedIcon}
      </StyledCircle>
  }
  else {
    return customLockedIcon
    ? lockedIcon
    : <StyledCircle current={currentNavigationId} circleSection={navigationId}>
        {lockedIcon}
      </StyledCircle>
  }
};

export default Stage;