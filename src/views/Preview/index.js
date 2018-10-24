import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Card from '../../components/Card';

const PreviewContainer = styled.div`
  width: 100%;
  padding: 25px;
  
  display: flex;
  justify-content: space-evenly;
  
`;

class Preview extends React.Component {
  render() {
    return (
      <PreviewContainer>
        <Button onClick={() => window.alert('Whew, that felt great!')} animated>Click me!</Button>
        <Card>5</Card>
      </PreviewContainer>
    )
  }
}

export default Preview;