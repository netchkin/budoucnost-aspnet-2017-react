import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SampleComponent from './SampleComponent.full';
import CounterDemo from './CounterDemo.full';

class App extends Component {
  render() {
    const drinks = ["water", "beer", "shots"];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          drinks.map(d => (<SampleComponent name={d} />  ))
        }
        
        {/* <CounterDemo name={"water"} />       */}
      </div>
    );
  }
}

export default App;
