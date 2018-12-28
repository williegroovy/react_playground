import { useState } from 'react';

const useDecisionTree = (decisions, initialDecisionId) => {
  const [ decision, setDecision ] = useState(decisions[initialDecisionId]);
  const [ history, setHistory ] = useState([]);

  const navigateToDecision = (newDecisionId) => {
    setHistory([ ...history, decision.id ]);
    setDecision(decisions[ newDecisionId ]);
  };

  const handleBack = () => {
    const newDecisionId = history.slice(-1);
    const newHistory = history.slice(0, history.length - 1);
    setHistory(newHistory);
    setDecision(decisions[ newDecisionId ]);
  };

  const hasHistory = () => history.length > 0;

  return [decision, navigateToDecision, handleBack, hasHistory];
};

export default useDecisionTree;