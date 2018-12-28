import styled from 'styled-components';

export const StyledProperContainer = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledTestContainer = styled.div`
  width: 300px;
  height: 100px;
  background-color: ${({ bgColor }) => bgColor ? bgColor : 'blue'};
  color: ${({ color }) => color ? color : 'black'};
  ${({ border }) => border && 'border: solid black 1px'};
`;