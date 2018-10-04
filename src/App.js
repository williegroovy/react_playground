import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import StepperDemo from './views/StepperDemo';
import MemoryGame from './views/MemoryGame';
import Checkout from './views/Checkout/index';
import ChuckNorris from './views/CheckNorris';
import DragAndDrop from './views/DragAndDrop/DragAndDrop';

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
          <Route path="/chuck" component={ChuckNorris} />
          <Route path="/dnd" component={DragAndDrop} />
        </Switch>
      </Router>
    );
  }
}

export default App;
