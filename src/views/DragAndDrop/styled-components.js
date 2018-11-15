import styled from 'styled-components';

export const StyledDnDContainer = styled.div`
  width: 100%;
  height: calc(100vh);
  background-color: orange;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledCanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledDropZone = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTaskItem = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ bgColor }) => bgColor ? bgColor : 'white' };
  text-align: center;
  vertical-align: middle;
`;