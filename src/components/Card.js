import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 200px;
  height: 250px;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 5px;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = ({ face }) => {

  return (
    <StyledCard>
      { face }
    </StyledCard>
  );
};

export default Card;