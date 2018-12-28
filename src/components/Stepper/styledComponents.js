import styled from "styled-components";

export const StyledStepperContainer = styled.div`
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
`;