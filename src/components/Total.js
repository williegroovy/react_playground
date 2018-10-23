import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { formatAsMoney } from '../utils/helpers';
import { StyledFlexAlign } from '../styled-components';

const StyledTotalContainer = styled(StyledFlexAlign)`
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 30px;
`;

const Total = ({ amount, align }) => {
  return (
    <StyledTotalContainer align={align}>
      Total: ${formatAsMoney(amount)}
    </StyledTotalContainer>
  )
};

Total.propTypes = {
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default Total;