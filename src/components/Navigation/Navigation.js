import React, { Component } from 'react';
import NavigationContext from './NavigationContext';
import customizableNavProperties from './customizableNavProperties';
import Progress from './Progress';
import Steps from './Steps';
import Step from './Step';
import Stage from './Stage';
import { StyledFooter, StyledHeader, StyledNavigationContainer } from './styledComponents';

const Header = ({ title }) => (<StyledHeader>{title}</StyledHeader>);
const Footer = ({ title }) => (<StyledFooter>{title}</StyledFooter>);

const defaultNavProperties = {
  hideNavigationUI: false,
  hideBackButton: false,
  backButtonText: '< Back',
  backButtonType: 'tertiary',
  hideForwardButton: false,
  forwardButtonText: 'Continue',
  forwardButtonType: 'default',
  useSecondaryButton: false,
  secondaryButtonType: 'ghost',
  secondaryButtonText: 'Secondary'
};

class Navigation extends Component {
  static Progress = Progress;
  static Steps = Steps;
  static Step = Step;
  static Stage = Stage;
  static Header = Header;
  static Footer = Footer;

  customNavProperties = null;
  onBeforeTransition = null;
  onAfterTransition = null;

  shouldSetNavProperties = () =>
    this.customNavProperties && !this.state.navCustomized && !Object.is(this.customNavProperties, defaultNavProperties);


  componentDidMount() {
    if(this.shouldSetNavProperties()) {
      this.setNavProperties(this.customNavProperties)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.currentNavigationId !== this.state.currentNavigationId && this.shouldSetNavProperties()) {
      this.setNavProperties(this.customNavProperties);
    }
  }

  setNavProperties = (navProperties) => {
    this.setState({
      navProperties,
      navCustomized: true
    })
  };

  setCustomizableNavProperties = (customProperties) => {
    this.customNavProperties = Object.entries(customProperties).reduce((accum, [key, value]) => {
      return customizableNavProperties.hasOwnProperty(key) ? {...accum, [key]: value} : accum;
    }, defaultNavProperties);
  };

  setOnBeforeTransition = (onBeforeTransition) => {
    this.onBeforeTransition = onBeforeTransition;
  };

  setOnAfterTransition = (onAfterTransition) => {
    this.onAfterTransition = onAfterTransition;
  };

  resetAllCustomData = () => {
    this.customNavProperties = null;
    this.onBeforeTransition = null;
    this.onAfterTransition = null;

    this.setState({
      navProperties: defaultNavProperties,
      navCustomized: false
    });
  };

  registerNavigationSequence = (stageList) => {
    this.setState({ stageList, stageHasBeenSet: true });
  };

  transition = (direction) => {
    if(typeof this.onBeforeTransition === 'function') {
      const shouldContinueTransition = this.onBeforeTransition.call(this) || true;
      if(!shouldContinueTransition) return;
    }

    if(typeof this.onAfterTransition === 'function') {
      this.onAfterTransition.call(this);
    }

    if(direction === 'forward') {
      this.setState({ currentNavigationId: this.state.currentNavigationId + 1 });
    } else if(direction === 'back') {
      this.setState({ currentNavigationId: this.state.currentNavigationId - 1 });
    }

    this.resetAllCustomData();
  };

  state = {
    navProperties: defaultNavProperties,
    navCustomized: false,
    navigationSequence: [],
    onRegisterNavigationSequence: this.registerNavigationSequence,
    navigationSequenceRegistered: false,
    currentNavigationId: 1,
    setCustomizableNavProperties: this.setCustomizableNavProperties,
    setOnBeforeTransition: this.setOnBeforeTransition,
    setOnAfterTransition: this.setOnAfterTransition,
    transition: this.transition
  };

  render() {
    return(
      <NavigationContext.Provider value={this.state}>
        <StyledNavigationContainer>
          { this.props.children }
        </StyledNavigationContainer>
      </NavigationContext.Provider>
    );
  }
}

export default Navigation;