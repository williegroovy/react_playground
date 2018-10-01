import React, { Component } from 'react';
import styled from 'styled-components';

import Progress, { Stage } from './Progress';
import Steps, { Step } from '../components/Steps';

const StyledStepperContainer = styled.div`
 width: calc(100% - 20px);
 height: calc(100% - 20px);
 display: flex;
`;

const StyledHeader = styled.div`
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

const StyledFooter = styled.div`
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

const Header = ({ title }) => (<StyledHeader>{title}</StyledHeader>);
const Footer = ({ title }) => (<StyledFooter>{title}</StyledFooter>);

class Stepper extends Component {
  state = {
    stage: this.props.stage
  };

  static defaultProps = {
    stage: 1
  };

  handleClick = () => {
    this.setState({ stage: this.state.stage + 1 });
  };

  static Progress = Progress;
  static Steps = Steps;
  static Step = Step;
  static Stage = Stage;
  static Header = Header;
  static Footer = Footer;

  render() {
    const { state, handleClick } = this;
    const { stage } = state;

    return(
      <StyledStepperContainer>
        {this.props.children(stage, handleClick)}
      </StyledStepperContainer>
    );
  }
}

export default Stepper;