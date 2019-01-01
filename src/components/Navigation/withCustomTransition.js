import React from 'react';
import invariant from 'invariant';
import NavigationContext from './NavigationContext';

const isFunction = (teste) => typeof teste === 'function';
const isReactElement = (teste) => isFunction(teste) && React.isValidElement(<teste />);

const applyCustomTransition = (customNavProperties, onBeforeTransition, onAfterTransition) => (
  (WrappedComponent) => (
    ({ setCustomizableNavProperties, setOnBeforeTransition, setOnAfterTransition }) => {

      if(typeof customNavProperties === 'object') {
        setCustomizableNavProperties(customNavProperties)
      }

      if (typeof onBeforeTransition === 'function') {
        setOnBeforeTransition(onBeforeTransition)
      }

      if (typeof onAfterTransition === 'function') {
        setOnAfterTransition(onAfterTransition)
      }

      return React.createElement(WrappedComponent);
    }
  )
);

const withCustomTransition = (initial) => {
  const isInitialValidComponent = isReactElement(initial);

  if(isInitialValidComponent) {
    const component = React.createElement(initial);
    invariant(false, `No customized properties passed, use withCustomNavigation({ customNavProperties, onBeforeTransition, onAfterTransition })(${component.type.name})`);
    return initial
  }

  const { customNavProperties, onBeforeTransition, onAfterTransition } = initial;
  // TODO: Need to ensure the the WrappedComponent is a child of Steps/Step.
  // TODO: Could be an issue where the Progress Stages can change UI properties for its corresponding Step.
  return WrappedComponent => (
    () => (
      <NavigationContext.Consumer>
        {
          applyCustomTransition(customNavProperties, onBeforeTransition, onAfterTransition)(WrappedComponent)
        }
      </NavigationContext.Consumer>
    )
  )
};


export default withCustomTransition;