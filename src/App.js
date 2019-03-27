import React, { Component } from 'react';
import logo from './DXtickets.png';
import './App.css';
import QRScanner from './Components/QRScanner/QRScanner'

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} alt=""/>
        <h1>Ticket Scanner</h1>
        <QRScanner />
      </div>
    );
  }
}

export default App;
