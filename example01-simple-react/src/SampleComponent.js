import React, { Component } from 'react';

export default class IncrementDemo extends Component {
  render() {
    const drink = {
      name: "water",
      count: 3
    }
    return (
    <div>
      <div><span>beverage: </span><span>{this.drink.name}</span></div>
      <div><span>count: </span><span>{this.drink.count}</span></div>
    </div>
    );
  }
}