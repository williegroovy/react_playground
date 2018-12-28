import styled from 'styled-components';

export const ControlPanel = styled.div`
  width: 300px;
  height: 500px;
  position: fixed;
  top: 0;
  left: 0;
  border: 1px solid black;
  margin: 10px;
  
  display: flex;
  flex-direction: column;
`;

export const CPRow = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const CPInput = styled.input``;