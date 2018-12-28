import React from "react";
import PropTypes from "prop-types";

import Proper from '../../Proper';
import { StyledTestContainer } from "./styledComponents";

class ProperTester extends React.Component {
    state = {
      border: true
    };

  render() {
    const { border } = this.state;
    const { title, bgColor, color } = this.props;

    return (
      <StyledTestContainer border={border} bgColor={bgColor} color={color}>
        {title}
      </StyledTestContainer>
    )
  }
}

ProperTester.propTypes = {
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string
};

export default Proper(ProperTester);