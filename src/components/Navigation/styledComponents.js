import styled from "styled-components";
import { StepNavigationContinueButtonType } from "../Stepper_Example/StepNavigation";

const getButtonColorByType = (type) => {
  if(type === StepNavigationContinueButtonType.Secondary) {
    return '#6b6c72';
  } else if (type === StepNavigationContinueButtonType.Ghost) {
    return '#fff';
  } else if(type === 'tertiary') {
    return 'transparent';
  } else {
    return '#05a4b5';
  }
};

const getButtonTextColorByType = (type) => {
 if (type === StepNavigationContinueButtonType.Ghost) {
    return '#05a4b5';
  } else if(type === 'tertiary') {
    return '#6b6c72';
  } else {
   // Primary and Secondary have same text color
    return '#fff';
  }
};

export const StyledNavigationContainer = styled.div`
 width: calc(100% - 20px);
 height: calc(100% - 20px);
 display: flex;
 font-family: 'Quicksand', sans-serif;
`;

export const StyledHeader = styled.div`
  height: 60px;
  margin-left: 20px;
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  color: #6bada7;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

export const StyledFooter = styled.div`
  height: 30px;
  margin-left: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  color: #6bada7;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  alignItems: center;
  padding-left: 15px;
`;

export const StyledStageContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin: 15px 0 15px 15px;
  border 2px solid #ccc;
  border-radius: 8px;
`;

export const StyledStageContent = styled.div`
  display: flex;
  margin: 10px
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #a1a1a1;
  font-weight: 700;
`;

export const StyledStage = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 8px;
  width: calc(100% - 20px);
`;

export const StyledButtonStageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 0 10px;
  margin: 20px 10px 10px 0;
  ${({ hideNavigationUI }) => hideNavigationUI && 'display: none'};
`;

export const StyledProgressContainer = styled.div`
  display: flex;
  width: 100px;
  margin: 15px 0px 15px 15px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(100% - 30px);
  background: white;
  border: 2px solid #ccc;
  border-radius: 8px;
`;

export const StyledCircle = styled.div`
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

export const StyledIconImage = styled.img`
  position: absolute;
  left: 15px;
  top: 15px;
  width: 15px;
`;

export const PrimaryButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  
  & button:last-child {
    margin-left: 20px;
  }
`;

export const BackButtonWrapper = styled.div``;