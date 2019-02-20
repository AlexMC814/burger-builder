import React, { Component } from 'react';

const asyncComponent = Wrapped => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      Wrapped().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const Comp = this.state.component;

      return Comp ? <Comp /> : null;
    }
  };
};

export default asyncComponent;
