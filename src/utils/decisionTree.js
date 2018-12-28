
const History = (() => {
  function History(initHistory = []) {
    this.history = initHistory;
  }

  History.prototype.appendHistory = function(appendId) {
    this.history = [...this.history, appendId];
  };

  History.prototype.peakHistory = function() {
    return this.history.slice(-1);
  };

  History.prototype.clearHistory = function() {
    this.history = [];
  };

  return History;
})();

const DecisionTree = (() => {
  function DecisionTree(init = {}) {
    this.decisions = init.decisions || {};
    this.current = init.decisions[init.initId] || {};
    this.error = init.decisions[init.errorId] || {};
  }

  DecisionTree.prototype.getCurrent = function() {
    return this.current;
  };

  DecisionTree.prototype.setCurrent = function(id) {
    this.current = this.decisions[id] || this.error || {};
  };

  return DecisionTree;
})();

export const DecisionTreeBuilder = (() => {
  function DecisionTreeWithBuilder() {}

  DecisionTreeWithBuilder.prototype.build = function(init) {
    debugger;
    return new DecisionTree(init);
  };

  return DecisionTreeWithBuilder;
})();

export const DecisionTreeWithHistoryBuilder = (() => {
  function DecisionTreeWithHistory() {}

  DecisionTreeWithHistory.prototype.build = function(init) {
    const decisionTree = new DecisionTree(init);
    const history = new History(init.history || []);

    return {...decisionTree, ...history }
  };

  return DecisionTreeWithHistory;
})();

const Builder = (() => {
  function Builder() {}

  Builder.prototype.build = function(builder, config) {
    return new builder().build(config);
  };

  return Builder;
})();

export default new Builder();

export const testConfig = {
  decisions: {
    1: {
      message: 'One'
    },
    2: {
      message: 'Two'
    },
    3: {
      message: 'Three'
    },
    4: {
      message: 'Four'
    },
    5: {
      message: 'Error'
    }
  },
  initId: 2,
  errorId: 5
};