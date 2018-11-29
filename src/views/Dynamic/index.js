import React from 'react';
import styled from 'styled-components';

const StyledDynamicWrapper =  styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const StyledControlPane = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #404040;
  position: fixed;
  left: 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  height: 30px;
  padding: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid white;
  font-family: sans-serif;
  font-size: 24px;
  text-align: center;
  color: white;
`;

const StyledControls = styled.div`
  display: flex;
  padding: 0 15px;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;


class Dynamic extends React.Component {

  render() {
    return(
      <StyledDynamicWrapper>
        <StyledControlPane>
          <StyledHeader>Controls</StyledHeader>
          <StyledControls>
            <input />
            <input />
          </StyledControls>
        </StyledControlPane>
      </StyledDynamicWrapper>
    )
  }
}

export default Dynamic;