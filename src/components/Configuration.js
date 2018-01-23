import React, { Component } from 'react';
import Server from './Server';
import AccountsAndKeys from './AccountsAndKeys';
import {
  Route,
  Link,
  Redirect
} from 'react-router-dom';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  resetNibble() {
    this.setState({
      redirect: true
    })
  }

  handleTotalAccountsChange(totalAccounts) {
    this.props.handleTotalAccountsChange(totalAccounts);
  }

  handleMnemonicChange(mnemonic) {
    this.props.handleMnemonicChange(mnemonic);
  }

  handleAutoGenerateChange(mnemonic) {
    this.props.handleAutoGenerateChange(mnemonic);
  }

  render() {

    if (this.state.redirect) {
      this.props.resetNibble({});
      return <Redirect to='/'/>;
    }

    const AccountsAndKeysPage = (props) => {
      return (
        <AccountsAndKeys
          handleTotalAccountsChange={this.handleTotalAccountsChange.bind(this)}
          handleMnemonicChange={this.handleMnemonicChange.bind(this)}
          handleAutoGenerateChange={this.handleAutoGenerateChange.bind(this)}
          totalAccounts={this.props.totalAccounts}
          mnemonic={this.props.mnemonic}
          autogenerate={this.props.autogenerate}
          resetNibble={this.resetNibble.bind(this)}
        />
      );
    };

            // <li><Link to={`${this.props.match.url}/server`}>Server</Link></li>
          // <Route path={`${this.props.match.url}/server`} component={Server}/>
    return (
      <div className="Configuration">
        <div className="content">
          <Route path={`${this.props.match.url}/accounts-and-keys`} component={AccountsAndKeysPage}/>

        </div>
      </div>
    );
  }
}

export default Configuration;
