import React from 'react';
import { ExplainWhyContainer } from './styled-components';
import useDecisionTree from './useDecisionTree';

const decisions = {
   412: {
     id: 412,
     title: 'How to win the war.',
     value: 'You just fight and win.',
     nestedItems: [76, 18, 321]
   },
   1029: {
     id: 1029,
     title: 'Guide to doves.',
     value: 'Not much to it, feed em... bout it!',
     nestedItems: [412, 76]
   },
   18: {
     id: 18,
     title: 'Like a candle in the wind?',
     value: 'You\'re not you when you\'re hungry...',
     nestedItems: [412, 1029, 321, 76]
   },
   321: {
     id: 321,
     title: 'Pirates? What do they have to do with anything?',
     value: 'They tell tales that no one dares tell for fear of losing their tail.',
     nestedItems: []
   },
   76: {
     id: 76,
     title: 'Kinda running out of ideas...',
     value: 'No, I mean I\'m literally out of ideas. you\'ll have to help me out here.',
     nestedItems: [1029, 412]
   }
 };

const ExplainWhy = () => {
  const [decision, navigateToDecision, handleBack, hasHistory ] = useDecisionTree(decisions, 1029);

  const { nestedItems, title, value } = decision;

  return (
    <ExplainWhyContainer>
      <div>
        {
          hasHistory() && <button onClick={handleBack}>{'<-- back'}</button>
        }
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <div>
        {
          nestedItems.map((nestedId) => (
            <div onClick={() => navigateToDecision(nestedId)}><p>{decisions[nestedId].title}</p></div>
          ))
        }
      </div>
    </ExplainWhyContainer>
  )
};

export default ExplainWhy;
