import React, { Component } from 'react';

export default class IncrementDemo extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
    
  }
  increment() {
    // this.setState({ count: this.state.count + 1 });
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
    <div>
      {this.props.name}: 
      <span>count:</span>
      <span>{this.state.count}</span>
      <button onClick={() => this.increment()}>+</button>
    </div>
    );
  }
}