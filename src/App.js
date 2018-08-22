import React, { Component } from 'react';

import GetWeather from './components/GetWeather'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GetWeather />
      </div>
    );
  }
}

export default App;
