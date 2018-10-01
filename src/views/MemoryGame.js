import React from 'react';
import styled from 'styled-components';

import Card from '../components/Card';

const StyledGameContainer =  styled.div`
  background-color: #F4F7F6;
  padding: 10px;
  
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
  justify-content: space-around;
`;

const StyledGameCanvas = styled.div``;

const GameCanvas = ({ children }) => {
  return(
    <StyledGameCanvas>
      {children}
    </StyledGameCanvas>
  )
};

class MemoryGame extends React.Component {

  state = {
    cardCount: 24
  };

  render() {
    const cards = ['One', 'Two', 'Three', 'Four', 'Five', 'One', 'Two', 'Three', 'Four', 'Five'];
    return(
      <StyledGameContainer>
        <GameCanvas>
        { cards.map((curr) => <Card face={curr} />) }
        </GameCanvas>
      </StyledGameContainer>
    );
  }
}

export default MemoryGame;