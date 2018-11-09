import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import StepperDemo from './views/StepperDemo';
import MemoryGame from './views/MemoryGame';
import Checkout from './views/Checkout';
import DragAndDrop from './views/DragAndDrop';
import Dynamic  from './views/Dymaic';
import Preview from './views/Preview';
import Proper from './views/Proper';
import ExplainWhy from './views/ExplainWhy';

import './injectGlobalStyles';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/stepper" component={StepperDemo} />
          <Route path="/memory" component={MemoryGame} />
          <Route path="/cart" component={Checkout} />
          <Route path="/dnd" component={DragAndDrop} />
          <Route path="/dynamic" component={Dynamic} />
          <Route path="/preview" component={Preview} />
          <Route path="/proper" component={Proper} />
          <Route path="/explainwhy" component={ExplainWhy} />
        </Switch>
      </Router>
    );
  }
}

export default App;
