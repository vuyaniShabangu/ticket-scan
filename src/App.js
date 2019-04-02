import React, { Component } from 'react';
import logo from './tenflags.jpeg';
import './App.css';
import QRScanner from './Components/QRScanner/QRScanner'

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="logo" alt=""/>
        <QRScanner />
      </div>
    );
  }
}

export default App;