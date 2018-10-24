import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';

const PreviewContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 25px;
`;

class Preview extends React.Component {
  render() {
    return (
      <PreviewContainer>
        <Button onClick={() => window.alert('Whew, that felt great!')} animated>Click me!</Button>
      </PreviewContainer>
    )
  }
}

export default Preview;