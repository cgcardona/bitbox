import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Wallet from './components/Wallet';
import Blocks from './components/Blocks';
import Transactions from './components/Transactions';
import Logs from './components/Logs';
import Configuration from './components/Configuration';
import './App.css';
const Bitcoin = require('bitcoinjs-lib');
const BIP39 = require('bip39');
const crypto = require('crypto');

class App extends Component {
  totalAccounts = 10;
  mnemonic = '';
  autogenerate = true;

  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      addresses: [],
      configuration: {
        wallet: {
          createNewWallet: true,
          network: 'bitcoin'
        },
        createNewBlockchain: true
      }
    };
  }

  componentDidMount() {
    if(this.state.configuration.wallet.createNewWallet) {
      this.createHDWallet({
        totalAccounts: this.totalAccounts,
        mnemonic: this.mnemonic,
        autogenerate: this.autogenerate
      });
      let config = this.state.configuration;
      config.createNewBlockchain = false;
      this.setState({
        configuration: config
      });
    }
  }

  createHDWallet(config) {
    console.log(config);
    if(!config.mnemonic && config.autogenerate) {
      config.mnemonic = BIP39.entropyToMnemonic(
        crypto.randomBytes(16).toString('hex'),
      );
    }

    const seed = BIP39.mnemonicToSeed(config.mnemonic, '');
    const masterkey = Bitcoin.HDNode.fromSeedBuffer(
      seed,
      Bitcoin.networks[this.state.configuration.wallet.network],
    );

    const account = masterkey
      .deriveHardened(44)
      .deriveHardened(0)
      .deriveHardened(0);
    const addresses = [];
    for (let i = 0; i < config.totalAccounts; i++) {
      addresses.push(
        account
          .derive(0)
          .derive(i)
          .getAddress(),
      );
    }
    this.setState({
      mnemonic: config.mnemonic,
      addresses: addresses,
    });
  }

  resetNibble(config) {
    if(!config.totalAccounts) {
      config.totalAccounts = this.totalAccounts;
    }

    if(!config.mnemonic && this.mnemonic !== '') {
      config.mnemonic = this.mnemonic;
    }

    if(!config.autogenerate && this.autogenerate !== false) {
      config.autogenerate = this.autogenerate;
    }
    this.createHDWallet(config);
  }

  handleMnemonicChange(mnemonic) {
    this.mnemonic = mnemonic;
  }

  handleTotalAccountsChange(totalAccounts) {
    this.totalAccounts = totalAccounts;
  }

  handleAutoGenerateChange(autogenerate) {
    this.autogenerate = autogenerate;
  }

  render() {
    let list = []
    if (this.state.addresses.length) {
      this.state.addresses.forEach(address => {
        list.push(<li>Address: {address} | Balance: 0 | TX Count: 0 |</li>);
      });
    }

    const WalletPage = (props) => {
      return (
        <Wallet
          mnemonic={this.state.mnemonic}
          addresses={this.state.addresses}
        />
      );
    };

    const ConfigurationPage = (props) => {
      console.log(this);
      return (
        <Configuration
          match={props.match}
          resetNibble={this.resetNibble.bind(this)}
          totalAccounts={this.totalAccounts}
          mnemonic={this.state.mnemonic}
          autogenerate={this.autogenerate}
          handleTotalAccountsChange={this.handleTotalAccountsChange.bind(this)}
          handleMnemonicChange={this.handleMnemonicChange.bind(this)}
          handleAutoGenerateChange={this.handleAutoGenerateChange.bind(this)}
        />
      );
    };


    return (
      <Router>
        <div>
          <div className="header">
            <div className="pure-menu pure-menu-horizontal">
              <a className="pure-menu-heading" href="">BitBox</a>
              <ul className="pure-menu-list">
                <li className="pure-menu-item pure-menu-selected"><Link className="pure-menu-link" to="/">Wallet</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/blocks">Blocks</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/transactions">Transactions</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/logs">Logs</Link></li>
              </ul>
              <ul className="pure-menu-list right">
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/configuration/accounts-and-keys">Configuration</Link></li>
              </ul>
            </div>
          </div>

          <Route exact path="/" component={WalletPage}/>
          <Route path="/blocks" component={Blocks}/>
          <Route path="/transactions" component={Transactions}/>
          <Route path="/logs" component={Logs}/>
          <Route path="/configuration" component={ConfigurationPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
