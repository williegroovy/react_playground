import React from 'react';
import ProperTestComponent from './ProperTestComponent';
import { StyledProperContainer } from './styledComponents';

const ProperWrapper = () => {
  return(
    <StyledProperContainer>
      <ProperTestComponent title="My title is cool" bgColor="pink" />
    </StyledProperContainer>
  )
};

export default ProperWrapper;