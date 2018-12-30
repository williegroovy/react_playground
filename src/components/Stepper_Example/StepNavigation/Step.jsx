import React from 'react';
import PropTypes from 'prop-types';

const Step = ({component, render, transition, customNavigationProps, ...props }) => {
  if (!component && !render) {
    console.error('Step Component: No component provided either on component or render prop.');
    return null;
  }

  const childrenProps = {
    transition,
    ...customNavigationProps,
    ...props
  };

  return component
    ? React.createElement(component, { ...childrenProps })
    : React.cloneElement(render(), { ...childrenProps });
};

Step.propTypes = {
  transition: PropTypes.func,
  customNavigationProps: PropTypes.object
};

export default Step;
