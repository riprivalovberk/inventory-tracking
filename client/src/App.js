import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import InventoryList from './components/InventoryList';

import {Provider} from 'react-redux';
import store from './store'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <InventoryList />
      </div>
      </Provider>
    );
  }
}

export default App;
