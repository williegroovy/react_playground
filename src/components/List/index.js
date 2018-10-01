import React from 'react';
import { StyledList, StyledRow, StyledRowSegment, StyledQtyButton } from './styled-components';

const List = ({ items, handleUpdateQty, children }) => {
  return(
    <StyledList>
      <StyledRow key="titleRow">
        <StyledRowSegment title="true" width={40}>Name</StyledRowSegment>
        <StyledRowSegment title="true" align="true" width={40}>Qty</StyledRowSegment>
        <StyledRowSegment title="true" align="right" width={20}>Price</StyledRowSegment>
      </StyledRow>
      {
        items.map(curr =>
          <StyledRow key={curr.id}>
            <StyledRowSegment width={40}>{curr.name}</StyledRowSegment>
            <StyledRowSegment align="true" width={40}>
              <StyledQtyButton left="true" onClick={() => handleUpdateQty(curr.id, 'sub')}>-</StyledQtyButton>
              {curr.qty}
              <StyledQtyButton right="true" onClick={() => handleUpdateQty(curr.id, 'add')}>+</StyledQtyButton>
            </StyledRowSegment>
            <StyledRowSegment align="right" width={20}>${curr.price}</StyledRowSegment>
          </StyledRow>
        )
      }
      {children}
    </StyledList>
  )
};

export default List;
