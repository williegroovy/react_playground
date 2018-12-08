import React, { useState, useEffect } from 'react';
import { ExplainWhyContainer } from './styled-components';

const ExplainWhy = () => {
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
      nestedItems: [18, 321, 76, 321]
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

  console.log(decisions[1029]);
  const [decision, setDecision] = useState(decisions[1029]);
    const [history, setHistory] = useState([]);

    const navigateToNestedDecision = (newDecisionId) => {
      setHistory([...history, decision.id]);
      setDecision(decisions[newDecisionId]);
    };

    const handleBack = () => {
      const newDecisionId = history.slice(-1);
      const newHistory = history.slice(0, history.length -1);
      setHistory(newHistory);
      setDecision(decisions[newDecisionId]);
    };

    useEffect(() => {
      debugger;
    });

  const { nestedItems, title, value } = decision;

  return (
    <ExplainWhyContainer>
      <div>
        {
         history.length > 0 && <button onClick={handleBack}>{'<-- back'}</button>
        }
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <div>
        {
          nestedItems.map((nestedId) => (
            <div onClick={() => navigateToNestedDecision(nestedId)}><p>{decisions[nestedId].title}</p></div>
          ))
        }
      </div>
    </ExplainWhyContainer>
  )
};

export default ExplainWhy;
