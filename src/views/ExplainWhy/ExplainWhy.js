import React from 'react';

import DecisionTree from '../../components/DecisionTree';
import { ExplainWhyContainer } from './styled-components';

const ExplainWhy = () => {
  const decisionConfig = {};

  return (
    <ExplainWhyContainer>
      <DecisionTree config={decisionConfig} />
    </ExplainWhyContainer>
  )
};

export default ExplainWhy;
