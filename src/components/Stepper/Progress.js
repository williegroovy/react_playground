import React from 'react';
import HourGlass from '../../animations/HourGlass';
import checked from '../../icons/checked2.svg';
import padlock from '../../icons/padlock.svg';
import NavigationContext from './NavigationContext';

import { StyledProgressContainer, StyledCircle, StyledIconImage, StyledStage } from './styledComponents';

const renderIcon = (currentNavigationId, num) => {
  if(currentNavigationId === num) {
    return <HourGlass style={{ animationDuration: 0 }} size="30px" />;
  } else if (currentNavigationId < num) {
    return(
      <div>
        <div>{num}</div>
        <StyledIconImage src={padlock} />
      </div>
    );
  }
  return <img className="animated fadeIn" style={{ width: '12px'}} src={checked} />
};

export const Stage = ({ currentNavigationId, num }) => (
  <StyledCircle current={currentNavigationId} circleSection={num}>
    {renderIcon(currentNavigationId, num)}
  </StyledCircle>
);


const Progress = ({ children }) => (
  <NavigationContext.Consumer>
    {
      ({ currentNavigationId }) => (
        <StyledProgressContainer>
          {
            React.Children.map(children, (child) => React.cloneElement(child, { currentNavigationId }, child.children), this)
          }
        </StyledProgressContainer>
     )
    }
  </NavigationContext.Consumer>
);

export default Progress;