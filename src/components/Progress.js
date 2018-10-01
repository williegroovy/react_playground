import React from 'react';
import styled from 'styled-components';
import HourGlass from '../animations/HourGlass';
import checked from '../icons/checked2.svg';
import padlock from '../icons/padlock.svg';

const StyledProgressContainer = styled.div`
  display: flex;
  width: 100px;
  margin: 15px 0px 15px 15px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(100% - 20px);
  background: white;
  border: 2px solid #ccc;
  border-radius: 8px;
`;

const StyledCircle = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  width: ${({ current, circleSection }) => current === circleSection ? '50px' : '30px'};
  height: ${({ current, circleSection }) => current === circleSection ? '50px' : '30px'};
  background: white;
  border-radius: 40px;
  border: ${({ current, circleSection }) => current > circleSection ? '3px solid #6bada7' : '3px solid #ccc' };
  z-index: 3;
  position: relative;
`;

const StyledIconImage = styled.img`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 15px;
`;

const renderIcon = (stage, num) => {
  if(stage === num) {
    return <HourGlass size="30px" />;
  } else if (stage < num) {
    return(
      <div>
        <div>{num}</div>
        <StyledIconImage src={padlock} />
      </div>
    );
  }
  return <img className="animated fadeIn" style={{ width: '12px' }} src={checked} />
};

export const Stage = ({ stage, num }) => <StyledCircle>{renderIcon(stage, num)}</StyledCircle>;


const Progress = ({ children }) => (
  <StyledProgressContainer>
    {children}
  </StyledProgressContainer>
);

export default Progress;