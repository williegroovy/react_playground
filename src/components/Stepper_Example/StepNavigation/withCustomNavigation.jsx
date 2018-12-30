import React from 'react';
import PropTypes from 'prop-types';
import customizableProperties from './customizableProperties';

const withCustomNavigation = (WrappedComponent, customData, eventCallbacks = {}) => {
  class CustomNavigationHOC extends React.Component {
    constructor(props) {
      super(props);

      if (!props.stepNavigation) {
        throw new Error('withCustomNavigation: HOC should be used inside a Step component');
      }

      if (customData) {
        Object.keys(customizableProperties).forEach((propertyName) => {
          const customValue = customData[propertyName];

          if (!customValue) return;

          props.stepNavigation.setCustomProperty(propertyName, customValue);
        });
      }

      this.getWrappedComponentInstance = this.getWrappedComponentInstance.bind(this);
    }

    getWrappedComponentInstance(wrappedComponentInstance) {
      if (!wrappedComponentInstance) return;

      this.activeStepInstance = wrappedComponentInstance;

      if (eventCallbacks.onBeforeTransition) {
        if (typeof eventCallbacks.onBeforeTransition === 'function') {
          this.props.stepNavigation.setOnBeforeTransition(eventCallbacks.onBeforeTransition.bind(wrappedComponentInstance));
        }
        else {
          this.props.stepNavigation.setOnBeforeTransition(this.activeStepInstance[eventCallbacks.onBeforeTransition].bind(wrappedComponentInstance));
        }
      }

      if (eventCallbacks.onSecondaryButtonClick) {
        if (typeof eventCallbacks.onSecondaryButtonClick === 'function') {
          this.props.stepNavigation.setOnSecondaryButtonClick(eventCallbacks.onSecondaryButtonClick.bind(wrappedComponentInstance));
        }
        else {
          this.props.stepNavigation.setOnSecondaryButtonClick(this.activeStepInstance[eventCallbacks.onSecondaryButtonClick].bind(wrappedComponentInstance));
        }
      }
    }

    render() {
      return <WrappedComponent ref={this.getWrappedComponentInstance} {...this.props} />;
    }
  }

  CustomNavigationHOC.propTypes = {
    stepNavigation: PropTypes.shape({
      setCustomProperty: PropTypes.func.isRequired,
      setOnBeforeTransition: PropTypes.func.isRequired,
      setOnSecondaryButtonClick: PropTypes.func.isRequired,
      resetCustomNavigationProperties: PropTypes.func.isRequired
    })
  };

  return CustomNavigationHOC;
};

export default withCustomNavigation;
