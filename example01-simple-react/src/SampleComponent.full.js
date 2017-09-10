import React, { Component } from 'react';

export default class IncrementDemo extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }
  increment() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    
    return (
    <div>
      <div><span>beverage: </span><span>{this.props.name}</span></div>
      <div><span>count: </span><span>{this.state.count}</span></div>
      <button onClick={() => this.increment()}>+</button>
    </div>
    );
  }
}