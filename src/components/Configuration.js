import React, { Component } from 'react';
import logo from '../logo.svg';
import Server from './Server';
import AccountsAndKeys from './AccountsAndKeys';
import {
  Route,
  Link
} from 'react-router-dom';

class Configuration extends Component {
  constructor(props) {
    super(props);
    console.log(props.match);

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Configuration</h1>
        </header>
        <ul className="App-intro">
          <li><Link to={`${this.props.match.url}/server`}>Server</Link></li>
          <li><Link to={`${this.props.match.url}/accounts-and-keys`}>accounts-and-keys</Link></li>
        </ul>
        <Route path={`${this.props.match.url}/server`} component={Server}/>
        <Route path={`${this.props.match.url}/accounts-and-keys`} component={AccountsAndKeys}/>

      </div>
    );
  }
}

export default Configuration;
