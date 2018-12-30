import React, { Component } from 'react';
import NavigationContext from './NavigationContext';
import Progress, { Stage } from './Progress';
import Steps from './Steps';
import Step from './Step';
import { StyledFooter, StyledHeader } from './styledComponents';

const Header = ({ title }) => (<StyledHeader>{title}</StyledHeader>);
const Footer = ({ title }) => (<StyledFooter>{title}</StyledFooter>);

class Navigation extends Component {
  static Progress = Progress;
  static Steps = Steps;
  static Step = Step;
  static Stage = Stage;
  static Header = Header;
  static Footer = Footer;

  shouldChildAugmentProps = (childType) => (childType === Progress || childType === Steps);
  shouldGrandChildAugmentProps = (childType) => (childType === Step || childType === Stage);

  transition = (direction) => {
    if(direction === 'forward') {
      this.setState({ currentNavigationId: this.state.currentNavigationId + 1 });
    } else if(direction === 'back') {
      this.setState({ currentNavigationId: this.state.currentNavigationId - 1 });
    }
  };

  onBeforeTransition = (direction, callback) => {
    if(typeof callback === 'function') {
      callback(direction);
    }
    this.transition(direction);
    this.resetCustomProperties();
  };

  resetCustomProperties = () => {
    this.setState({ onBeforeTransition: this.onBeforeTransition });
  } ;

  registerNavigationSequence = (stageList) => {
    this.setState({ stageList, stageHasBeenSet: true });
  };

  state = {
    navigationSequence: [],
    onRegisterNavigationSequence: this.registerNavigationSequence,
    navigationSequenceRegistered: false,
    currentNavigationId: 1,
    onBeforeTransition: this.onBeforeTransition
  };

  render() {
    return(
      <NavigationContext.Provider value={this.state}>
        { this.props.children }
      </NavigationContext.Provider>
    );
  }
}

export default Navigation;

/*
  <StepperContext.Provider value={this.state}>
  </StepperContext.Provider>
 */