import React from 'react';

export default (importComponent) => {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
    }

    state = {
      component: null
    };

    async componentDidMount() {
      const {default: component} = await importComponent();

      this.setState({component});
    }

    render() {
      const Component = this.state.component;
      return Component ? <Component {...this.props} /> : null
    }
  }

  return AsyncComponent;
}