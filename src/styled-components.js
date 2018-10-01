import styled from 'styled-components';

export const StyledFlexAlign = styled.div`
  ${
    ({ align, direction = 'row' }) => {
      if (align) {
        let direction = 'center';

        if (align === 'right') {
          direction = 'flex-end';
        }
        else if (align === 'left') {
          direction = 'flex-start';
        }
        return (direction === 'row' ? 'align-items: ' : 'justify-content: ') + direction;
      }
    }
  }
`;