import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import InventoryList from './components/InventoryList';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <InventoryList />
      </div>
    );
  }
}

export default App;
