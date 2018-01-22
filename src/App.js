import React, { Component } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Accounts from './components/Accounts';
import Blocks from './components/Blocks';
import Transactions from './components/Transactions';
import Logs from './components/Logs';
import Configuration from './components/Configuration';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Accounts</Link></li>
            <li><Link to="/blocks">Blocks</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/logs">Logs</Link></li>
            <li><Link to="/configuration">Configuration</Link></li>
          </ul>

          <Route exact path="/" component={Accounts}/>
          <Route path="/blocks" component={Blocks}/>
          <Route path="/transactions" component={Transactions}/>
          <Route path="/logs" component={Logs}/>
          <Route path="/configuration" component={Configuration}/>
        </div>
      </Router>
    );
  }
}

export default App;
