import React, { Component } from 'react';
import './App.css';
import RestaurantList from './RestaurantList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={process.env.PUBLIC_URL + '/img/sysco_blck-wht.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MAHI</h1>
        </header>
        
        <RestaurantList />
      </div>
    );
  }
}

export default App;
