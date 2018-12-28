import React from 'react';
import Button from '../Button';
import { StepperContext } from './Stepper';
import { StyledStageContainer, StyledStage, StyledButtonStageContainer } from './styledComponents';

const Steps = ({ stage, navigate, registerStageList, children }) => {

  //registerStageList(React.Children.map(children, child => child.props.id, this));

  return (
    <StyledStageContainer>
      <StyledStage>
        {children}
      </StyledStage>
      <StyledButtonStageContainer>
        <Button disabled={stage === 1} onClick={() => navigate('back')} animated>Back</Button>
        <Button disabled={stage === 4} onClick={() => navigate('forward')} animated>Continue</Button>
      </StyledButtonStageContainer>
    </StyledStageContainer>
  );
};

export default Steps;

/*
  Issue in this component with a render not a function / multiple children error message.
  <StepperContext.Consumer>
  </StepperContext.Consumer>
 */