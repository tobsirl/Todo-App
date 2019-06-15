import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Landing />
      </Fragment>
    );
  }
}

export default App;
