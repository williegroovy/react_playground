import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getButtonBackgroundColorByType = (type) => {
  if(type === 'secondary') {
    return '#6b6c72';
  } else if (type === 'ghost') {
    return '#fff';
  } else if(type === 'tertiary') {
    return 'transparent';
  } else {
    return '#6bada7';
  }
};

const getButtonTextColorByType = (type) => {
 if (type === 'ghost') {
    return '#6bada7';
  } else if(type === 'tertiary') {
    return '#6b6c72';
  } else {
   // Primary and Secondary have same text color
    return '#fff';
  }
};

const StyledButton = styled.button`
  width: 120px;
  background-color: ${({ buttonType }) => getButtonBackgroundColorByType(buttonType)};
  font-family: quicksand;
  font-size: ${({ block }) => block ? 20 : 16 }px;
  font-weight: 500;
  text-align: center;
  border-radius: 4px;
  border: ${({ buttonType }) => buttonType === 'ghost' ? '1px solid #6bada7' : 0};
  color: ${({ buttonType }) => getButtonTextColorByType(buttonType) };
  cursor: pointer;
  padding: 5px 15px 5px 15px;
  
  &:hover {
    ${({ animated }) => animated && 'animation: popAnimation 0.8s ease'};
  };
  
  &:focus {
    outline: none;
  }
  
  ${({ disabled }) => disabled && `
    cursor: not-allowed;
  `};
  
  @keyframes popAnimation {
    50% { transform: scale(1.2)  }
  }
  
  ${({ hidden }) => hidden && 'display: none'};
`;

const Button = ({ children, hidden=false, type='button', buttonType='primary', onClick, disabled, animated }) => (
    <StyledButton
      hidden={hidden}
      type={type}
      buttonType={buttonType}
      onClick={() => onClick && onClick()}
      animated={animated && !disabled}
      disabled={disabled}
    >
      {children}
    </StyledButton>
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