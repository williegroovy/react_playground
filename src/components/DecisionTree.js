import React from 'react';
import { Builder, DecisionTreeBuilder, DecisionTreeWithHistoryBuilder, testConfig } from '../utils/decisionTree';

const DecisionTree2 = () => {

  const treeBuilder = new Builder();

  const treeWithoutHistory = treeBuilder.build(new DecisionTreeBuilder(testConfig));
  const treeWithHistory = treeBuilder.build(new DecisionTreeWithHistoryBuilder(testConfig));

  console.log('treeWithoutHistory getCurrent', treeWithoutHistory.getCurrent());
  console.log('treeWithHistory getCurrent', treeWithHistory.getCurrent());

  return (
    <h2>Decision Tree</h2>
  )
};


export default DecisionTree2;
