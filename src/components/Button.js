import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SButton = styled.button`
  font-family: quicksand;
  font-size: ${({ block }) => block ? 20 : 16 }px;
  width: 100px;
  font-weight: 500;
  background: #6bada7;
  border-radius: 4px;
  border: 0;
  color: ${({ block }) => block ? 'red' : 'white'};
  cursor: pointer;
  padding: 5px 15px 5px 15px;
  
  &:hover {
    ${({ animated }) => animated && 'animation: popAnimation 0.8s ease'};
  };
  
  &:focus {
    outline: none;
  }
  
  ${({ disabled }) => disabled && `
    background: #ccc;
    color: white;
    cursor: not-allowed;
  `};
  
  @keyframes popAnimation {
    50% { transform: scale(1.2)  }
  }
`;

const Button = ({ children, type='button', onClick, disabled, animated }) => (
    <SButton
      type={type}
      onClick={() => onClick && onClick()}
      animated={animated && !disabled}
      disabled={disabled}
    >
      {children}
    </SButton>
  );

Button.defaultProps = {
  type: 'button',
  onClick: false,
  disabled: false,
  animated: false
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  type: PropTypes.oneOf(['button', 'rest', 'submit']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  animated: PropTypes.bool
};

export default Button;