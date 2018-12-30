import React from 'react';
import PropTypes from 'prop-types';

class SkipStep extends React.Component {
  componentDidMount() {
    const { transition, lastTransitionDirection } = this.props;
    transition(lastTransitionDirection);
  }

  render() {
    return null;
  }
}

SkipStep.propTypes = {
  transition: PropTypes.func,
  lastTransitionDirection: PropTypes.string
};

export default SkipStep;
