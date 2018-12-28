import React, { Component } from 'react';
import Progress, { Stage } from '../Progress';
import Steps from './Steps';
import Step from './Step';

import { StyledStepperContainer, StyledHeader, StyledFooter } from './styledComponents';

const Header = ({ title }) => (<StyledHeader>{title}</StyledHeader>);
const Footer = ({ title }) => (<StyledFooter>{title}</StyledFooter>);

export const StepperContext = React.createContext({
  stage: 1,
  onNavigate: () => {},
  registerStageList: () => {},
  stageHasBeenSet: false,
  navigate:() => {}
});

class Stepper extends Component {

  onNavigate = (direction) => {
    if(direction === 'forward') {
      this.setState({ stage: this.state.stage + 1 });
    } else if(direction === 'back') {
      this.setState({ stage: this.state.stage - 1 });
    }
  };

  registerStageList = (stageList) => {
    this.setState({ stageList, stageHasBeenSet: true });
  };

  state = {
    stage: this.props.initialStage,
    stageList: [],
    stageHasBeenSet: false,
    navigate: this.onNavigate,
    registerStageList: this.registerStageList
  };

  static Progress = Progress;
  static Steps = Steps;
  static Step = Step;
  static Stage = Stage;
  static Header = Header;
  static Footer = Footer;

  render() {
    const { stage } = this.state;

    return(
        <StyledStepperContainer>
          {this.props.children(stage, this.onNavigate)}
        </StyledStepperContainer>

    );
  }
}

export default Stepper;

/*
  <StepperContext.Provider value={this.state}>
  </StepperContext.Provider>
 */