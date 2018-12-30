import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StepNavigationContinueButtonType } from './StepNavigation';

export const StepNavigationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
`;

export const StepContent = styled.div`
  flex: 2;
`;

export const StepNavigationFooter = styled.div`
  border-top: 1px solid #d4d7dc;
  padding-top: 30px;
  margin-top: 50px;
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: space-between;
`;

const commonButtonCss = `
  @media (max-width: 768px) {
    min-width: 80px;
    width: 100%;
  }

  & span {
    font-size: 18px;
    font-weight: 500;
    transition: all .24s ease;
  }

  & i {
    vertical-align: middle;
    margin-right: 5px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const getButtonColorByType = (type) => {
  if(type === StepNavigationContinueButtonType.Secondary) {
    return '#6b6c72';
  } else if (type === StepNavigationContinueButtonType.Ghost) {
    return '#fff';
  } else if(type === 'tertiary') {
    return 'transparent';
  } else {
    return '#05a4b5';
  }
};

const getButtonTextColorByType = (type) => {
 if (type === StepNavigationContinueButtonType.Ghost) {
    return '#05a4b5';
  } else if(type === 'tertiary') {
    return '#6b6c72';
  } else {
   // Primary and Secondary have same text color
    return '#fff';
  }
};

const Button = styled.button`
  width: auto;
  min-width: 120px;
  color: ${({ buttonType }) => getButtonTextColorByType(buttonType) };
  background-color: ${({ buttonType }) => getButtonColorByType(buttonType)};
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 13px 24px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 4px;
  ${({ buttonType }) => buttonType === StepNavigationContinueButtonType.Ghost && 'border: 2px solid #06b6c9'};
  ;
`;

const IDSContinueButton = ({ children = 'Continue', buttonType, ...props }) => (
    <Button buttonType={buttonType} size="jumbo" {...props}>{children}</Button>
);

IDSContinueButton.propTypes = {
  children: PropTypes.node,
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'ghost'])
};

export const ContinueButton = styled(IDSContinueButton)`${commonButtonCss}`;

const IDSBackButton = props => (
  <Button buttonType="tertiary" {...props}>
    {"< Back"}
  </Button>
);

export const ContinueButtonWrapper = styled.div`
  
  & button:last-child {
    margin-left: 20px;
  }
`;

export const BackButton = styled(IDSBackButton)`
  ${commonButtonCss}

  width: auto;
  min-width: 62px;

  & span.idsButton__label {
    color: #6b6c72;
    padding-left: 18px;
    padding-right: 24px;
  }

  &:hover span.idsButton__overlay {
    background-color: #eceef1 !important;
  } 
`;
