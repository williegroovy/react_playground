import React from 'react';
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
    animation: popAnimation 0.8s ease;
  };
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    background: #ccc,
    color: white
    cursor: not-allowed
  }
  
  @keyframes popAnimation {
    50% { transform: scale(1.2)  }
  }
`;

const Button = ({ children, type, click = false, disabled }) => {
  return (
    <SButton
      type={type}
      onClick={() => click && click()}
      disabled={disabled}
    >
      {children}
    </SButton>

  )
};

export default Button;