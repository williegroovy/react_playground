import { StyledFlexAlign } from '../../styled-components';
import styled from 'styled-components';

export const StyledList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledRowSegment = styled(StyledFlexAlign)`
  height: 40px;
  display: flex;
  align-items: ${({ title }) => title ? 'flex-end' : 'center'};
  width: ${({ width }) => width }%;
  ${({ title }) => title && `
    border-bottom: 1px solid black;
    border-right: 1px solid black;
  `};
  
  :last-child {
    border-right: none;
  }
`;

export const StyledQtyButton = styled.button`
  height: 24px;
  width: 24px;
  font-family: sans-serif helvetica;
  font-size: 18px;
  text-align: center;
  color: ${({ right }) => right ? 'green' : 'red'};
  border: 1px solid #e8e8e8;
  border-radius: 50%;
  margin-left: ${({ right }) => right ? '5px' : 'none'};
  margin-right: ${({ left }) => left ? '5px' : 'none'};
  
  :hover {
    background-color: #e8e8e8;
  }
`;
