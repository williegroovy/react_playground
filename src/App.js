import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from './components/LoadingComponent';
import './injectGlobalStyles';

const AsyncHome = Loadable({ loader: () => import('./views/Home'), loading: LoadingComponent });
const AsyncStepperDemo = Loadable({ loader: () => import('./views/StepperDemo'), loading: LoadingComponent });
const AsyncMemoryGame = Loadable({ loader: () => import('./views/MemoryGame'), loading: LoadingComponent });
const AsyncCheckout = Loadable({ loader: () => import('./views/Checkout'), loading: LoadingComponent });
const AsyncDragAndDrop = Loadable({ loader: () => import('./views/DragAndDrop'), loading: LoadingComponent });
const AsyncDynamic  = Loadable({ loader: () => import('./views/Dynamic'), loading: LoadingComponent });
const AsyncPreview = Loadable({ loader: () => import('./views/Preview'), loading: LoadingComponent });
const AsyncProper = Loadable({ loader: () => import('./views/Proper'), loading: LoadingComponent });
const AsyncExplainWhy = Loadable({ loader: () => import('./views/ExplainWhy/ExplainWhy'), loading: LoadingComponent });


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AsyncHome} />
          <Route path="/stepper" component={AsyncStepperDemo} />
          <Route path="/memory" component={AsyncMemoryGame} />
          <Route path="/cart" component={AsyncCheckout} />
          <Route path="/dnd" component={AsyncDragAndDrop} />
          <Route path="/dynamic" component={AsyncDynamic} />
          <Route path="/preview" component={AsyncPreview} />
          <Route path="/proper" component={AsyncProper} />
          <Route path="/explainwhy" component={AsyncExplainWhy} />
        </Switch>
      </Router>
    );
  }
}

export default App;
