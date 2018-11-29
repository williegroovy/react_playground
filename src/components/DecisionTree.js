import React from 'react';
import Builder, { DecisionTreeBuilder, DecisionTreeWithHistoryBuilder, testConfig } from '../utils/decisionTree';

const DecisionTree2 = () => {


  const treeWithoutHistory = Builder.build(DecisionTreeBuilder, testConfig);
  const treeWithHistory = Builder.build(DecisionTreeWithHistoryBuilder, testConfig);

  console.log('treeWithoutHistory getCurrent', treeWithoutHistory.getCurrent());
  console.log('treeWithHistory getCurrent', treeWithHistory.getCurrent());

  return (
    <h2>Decision Tree</h2>
  )
};


export default DecisionTree2;
