import React, { Component } from 'react';
import NavigationContext from './NavigationContext';
import customizableProperties from './customizableProperties';
import Progress from './Progress';
import Steps from './Steps';
import Step from './Step';
import Stage from './Stage';
import { StyledFooter, StyledHeader, StyledNavigationContainer } from './styledComponents';

const Header = ({ title }) => (<StyledHeader>{title}</StyledHeader>);
const Footer = ({ title }) => (<StyledFooter>{title}</StyledFooter>);

const { customizableNavProperties, transitionTypes } = customizableProperties;

//TODO: Need to create and export some object for custom properties.
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

const defaultTransitionType = 'manual';

class Navigation extends Component {
  static Progress = Progress;
  static Steps = Steps;
  static Step = Step;
  static Stage = Stage;
  static Header = Header;
  static Footer = Footer;

  customNavProperties = null;
  customTransitionType = null;
  onBeforeTransition = null;
  onAfterTransition = null;
  transitionInterval = null;
  navigationSequence = null;

  shouldSetCustomization = (customValue) => {
    if (customValue === 'navigation') {
      return (
        this.customNavProperties
        && !this.state.navCustomized
        && !Object.is(this.customNavProperties, defaultNavProperties)
      );
    }

    if(customValue === 'transition') {
      return (
        this.customTransitionType
        && !this.state.transitionTypeCustomized
        && this.state.customTransitionType !== this.customTransitionType
      );
    }
  };

  componentDidMount() {
    if(this.shouldSetCustomization('navigation')) {
      this.setNavProperties(this.customNavProperties);
    }

    if(this.props.transitionType) {
      this.handleTransitionType(this.props.transitionType);
    }

    if(this.navigationSequence) {
     const navigationSequence = [...this.navigationSequence];

     this.setState({ navigationSequence });
     this.navigationSequence = null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.currentNavigationId !== this.state.currentNavigationId && this.shouldSetCustomization()) {
      this.setNavProperties(this.customNavProperties);
    }

    if(this.navigationSequence && this.state.navigationSequence && this.state.navigationSequence.length === 0) {
      debugger;
      const navigationSequence = [...this.navigationSequence];
      this.navigationSequence = null;
      this.setState({ navigationSequence });
    }
  }

  setTransitionInterval = (delay=500) => {
    this.transitionInterval = setInterval(() => this.transition('forward'), delay);
  };

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

  handleTransitionType = () => {
    const { transitionType } = this.props;

    if (typeof transitionType === 'object') {
      if (transitionType.hasOwnProperty('type')) {
        this.setTransitionType(transitionType);
      }
    }
  };

  setTransitionType = ({ type, delay }) => {

    if (transitionTypes.hasOwnProperty(type)) {
      this.setState({
        transitionType: type,
        transitionTypeCustomized: true
      });

      if (type === transitionTypes.auto) {
        this.setTransitionInterval(delay);
      }
    }
  };

  setOnBeforeTransition = (onBeforeTransition) => {
    this.onBeforeTransition = onBeforeTransition;
  };

  setOnAfterTransition = (onAfterTransition) => {
    this.onAfterTransition = onAfterTransition;
  };

  resetAllCustomData = () => {
    this.customNavProperties = null;
    this.customTransitionType = null;
    this.onBeforeTransition = null;
    this.onAfterTransition = null;
    //clearInterval(this.transitionInterval);

    this.setState({
      navProperties: defaultNavProperties,
      navCustomized: false,
      transitionTypeCustomized: false
    });
  };

  onRegisterNavigationSequence = (rawNavigationSequence) => {
    // Set this.navigationSequence an array to child navigationIds
    if(!this.navigationSequence) {
      this.navigationSequence = rawNavigationSequence.map(child => {
        if (child.type.name === 'Step' && child.props.navigationId) {
          return child.props.navigationId;
        }
      });
    }
  };

  transitionAdvanced = (nextCurrentNavId) => {
    const { transitionType, navigationSequence } = this.state;

    if(typeof this.onBeforeTransition === 'function') {
      const shouldContinueTransition = this.onBeforeTransition.call(this) || true;
      if(!shouldContinueTransition) return;
    }

    if (transitionType === 'auto') {
       if (navigationSequence && navigationSequence.length > 0 && nextCurrentNavId > navigationSequence.length) {
         nextCurrentNavId = navigationSequence[0];
       }
    }

    this.setState({ currentNavigationId: nextCurrentNavId });

    // The below should be called when the component  updates, not here.
    // Handle the reset work accordingly.
    if(typeof this.onAfterTransition === 'function') {
      this.onAfterTransition.call(this);
    }

    this.resetAllCustomData();
  };

  transition = (direction) => {

    if(direction === 'forward') {
      this.transitionAdvanced(this.state.currentNavigationId + 1);
    } else if(direction === 'back') {
      this.transitionAdvanced(this.state.currentNavigationId - 1);
    }
  };

  state = {
    navProperties: defaultNavProperties,
    navCustomized: false,
    transitionTypeCustomized: false,
    navigationSequence: null,
    registerNavigationSequence: this.onRegisterNavigationSequence,
    navigationSequenceRegistered: false,
    currentNavigationId: 1,
    setCustomizableNavProperties: this.setCustomizableNavProperties,
    setTransitionType: this.setTransitionType,
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
