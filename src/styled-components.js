import styled from 'styled-components';

/*
##242f1a
#89503f
#979f7e
#14140a
#2a5d5f
https://icolorpalette.com/color-palette-generator/300373/
 */
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