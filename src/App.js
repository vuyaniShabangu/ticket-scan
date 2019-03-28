import React, { Component } from 'react';
import logo from './DXtickets.png';
import './App.css';
import QRScanner from './Components/QRScanner/QRScanner'

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} alt=""/>
        <QRScanner />
      </div>
    );
  }
}

export default App;
