import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const StyledStageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px 0 15px 15px;
  border 2px solid #ccc;
  border-radius: 8px;
`;

const StyledStageContent = styled.div`
  display: flex;
  margin: 10px
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  justify-content: center;
  alignItems: center;
  font-size: 40px;
  color: #a1a1a1;
  font-weight: 700;
`;

const StyledStage = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  border-radius: 8px;
  width: calc(100% - 20px);
`;

const StyledButtonStageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40px;
  margin: 20px 10px 10px 0;
`;

export const Step = ({ stage, num, text }) => ( stage === num ? <StyledStageContent key={num}>{text}</StyledStageContent> : null);

const Steps = ({ stage, handleClick, children }) => (
  <StyledStageContainer>
    <StyledStage>
      {children}
    </StyledStage>
    <StyledButtonStageContainer>
      <Button disabled={stage === 4} click={handleClick}>Continue</Button>
    </StyledButtonStageContainer>
  </StyledStageContainer>
);

export default Steps;