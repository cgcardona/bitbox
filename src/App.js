import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';
import Wallet from './components/Wallet';
import Blocks from './components/Blocks';
import Blockchain from './components/Blockchain';
import BlockDetails from './components/BlockDetails';
import Transactions from './components/Transactions';
import Utxo from './components/Utxo';
import Configuration from './components/Configuration';
import './App.css';
import Bitcoin from 'bitcoinjs-lib';
import BIP39 from 'bip39';
import crypto from 'crypto';
import bchaddr from 'bchaddrjs';

class App extends Component {
  totalAccounts = 10;
  mnemonic = '';
  path = '';
  autogenerateMnemonic = true;
  autogeneratePath = true;

  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      addresses: [],
      blockchainInstance: '',
      utxoSet: '',
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
        autogenerateMnemonic: this.autogenerateMnemonic,
        autogeneratePath: this.autogeneratePath
      });
      let config = this.state.configuration;
      config.createNewBlockchain = false;
      this.setState({
        configuration: config
      });
    }
  }

  createHDWallet(config) {
    if(!config.mnemonic && config.autogenerateMnemonic) {
      config.mnemonic = BIP39.entropyToMnemonic(
        crypto.randomBytes(16).toString('hex'),
      );
    }

    if((!config.path && config.autogeneratePath) || !this.path) {
      let depth = Math.floor(Math.random() * 11);

      let path = "m/44'/0'";
      for(let i = 0; i <= depth; i++) {
        let child = Math.floor(Math.random() * 100);
        path = `${path}/${child}'`;
      }
      config.path = path;
    } else {
      config.path = this.path;
    }

    const seed = BIP39.mnemonicToSeed(config.mnemonic, '');
    const masterkey = Bitcoin.HDNode.fromSeedBuffer(seed, Bitcoin.networks[this.state.configuration.wallet.network]);

    const account = masterkey.derivePath(config.path);

    const addresses = [];
    for (let i = 0; i < config.totalAccounts; i++) {
      addresses.push(
        {
          public: bchaddr.toCashAddress(account.derive(i).getAddress()),
          private: account.derive(i).keyPair.toWIF(),
        }
      );
    }

    this.setState({
      mnemonic: config.mnemonic,
      path: config.path,
      addresses: addresses,
    });
    this.createBlockchain(addresses[0].public);
  }

  createBlockchain(coinbaseAddress) {
    let genesisTx = [{
      sender: 'coinbase',
      receiver: coinbaseAddress,
      amount: 12.5
    }];
    let blockchainInstance= new Blockchain(0, Date.now(), genesisTx, "0");
    let utxoSet = new Utxo(genesisTx[0].receiver, genesisTx[0].amount);
    this.handleBlockchainUpdate(blockchainInstance);
    this.handleUtxoUpdate(utxoSet);
  }

  resetBitbox(config) {
    if(!config.totalAccounts) {
      config.totalAccounts = this.totalAccounts;
    }

    if(!config.mnemonic && this.mnemonic !== '') {
      config.mnemonic = this.mnemonic;
    }

    if(!config.autogenerateMnemonic && this.autogenerateMnemonic !== false) {
      config.autogenerateMnemonic = this.autogenerateMnemonic;
    }
    if(!config.autogeneratePath && this.autogeneratePath === false) {
      config.autogeneratePath = this.autogeneratePath;
    }
    this.createHDWallet(config);
  }

  handleMnemonicChange(mnemonic) {
    this.mnemonic = mnemonic;
  }

  handlePathChange(path) {
    this.path = path;
  }

  handleTotalAccountsChange(totalAccounts) {
    this.totalAccounts = totalAccounts;
  }

  handleAutoGenerateMnemonicChange(autogenerateMnemonic) {
    this.autogenerateMnemonic = autogenerateMnemonic;
  }

  handleAutoGeneratePathChange(autogeneratePath) {
    this.autogeneratePath = autogeneratePath;
  }

  handlePathMatch(path) {
    if(path === '/' || path === '/blocks' || path === '/transactions' || path === '/logs' || path === '/configuration/accounts-and-keys') {
      return true;
    } else {
      return false;
    }
  }

  handleBlockchainUpdate(blockchainInstance) {
    this.setState({
      blockchainInstance: blockchainInstance
    })
  }

  handleUtxoUpdate(utxoSet) {
    this.setState({
      utxoSet: utxoSet
    })
  }

  render() {

  const pathMatch = (match, location) => {
    if (!match) {
      return false
    }
    return this.handlePathMatch(match.path);
  }
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
          path={this.state.path}
          blockchainInstance={this.state.blockchainInstance}
          addresses={this.state.addresses}
          utxoSet={this.state.utxoSet}
        />
      );
    };

    const BlocksPage = (props) => {
      return (
        <Blocks
          match={props.match}
          blockchainInstance={this.state.blockchainInstance}
          handleBlockchainUpdate={this.handleBlockchainUpdate.bind(this)}
          handleUtxoUpdate={this.handleUtxoUpdate.bind(this)}
          addresses={this.state.addresses}
          utxoSet={this.state.utxoSet}
        />
      );
    };

    const BlockDetailsPage = (props) => {
      return (
        <BlockDetails
        />
      );
    };

    const ConfigurationPage = (props) => {
      return (
        <Configuration
          match={props.match}
          resetBitbox={this.resetBitbox.bind(this)}
          totalAccounts={this.totalAccounts}
          mnemonic={this.state.mnemonic}
          path={this.state.path}
          autogenerateMnemonic={this.autogenerateMnemonic}
          autogeneratePath={this.autogeneratePath}
          handleTotalAccountsChange={this.handleTotalAccountsChange.bind(this)}
          handleMnemonicChange={this.handleMnemonicChange.bind(this)}
          handlePathChange={this.handlePathChange.bind(this)}
          handleAutoGenerateMnemonicChange={this.handleAutoGenerateMnemonicChange.bind(this)}
          handleAutoGeneratePathChange={this.handleAutoGeneratePathChange.bind(this)}
        />
      );
    };

    return (
      <Router>
        <div>
          <div className="header main-header">
            <div className="pure-menu pure-menu-horizontal">
              <Link className="pure-menu-heading" to="/">BitBox</Link>
              <ul className="pure-menu-list">

                <li className="pure-menu-item">
                  <NavLink
                    isActive={pathMatch}
                    activeClassName="pure-menu-selected"
                    className="pure-menu-link"
                    to="/">
                    <i className="fas fa-user"></i> Wallet
                  </NavLink>
                </li>
                <li className="pure-menu-item">
                  <NavLink
                    isActive={pathMatch}
                    activeClassName="pure-menu-selected"
                    className="pure-menu-link"
                    to="/blocks">
                    <i className="fas fa-cubes"></i> Blocks
                  </NavLink>
                </li>
                <li className="pure-menu-item">
                  <NavLink
                    isActive={pathMatch}
                    activeClassName="pure-menu-selected"
                    className="pure-menu-link"
                    to="/transactions">
                    <i className="fas fa-exchange-alt"></i> Transactions
                  </NavLink>
                </li>
              </ul>
              <ul className="pure-menu-list right">
                <li className="pure-menu-item">
                  <NavLink
                    isActive={pathMatch}
                    activeClassName="pure-menu-selected"
                    className="pure-menu-link"
                    to="/configuration/accounts-and-keys">
                    <i className="fas fa-cog"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <Switch>
            <Route exact path="/blocks" component={BlocksPage}/>
            <Route path="/blocks/:block_id" component={BlockDetailsPage}/>
            <Route path="/transactions" component={Transactions}/>
            <Route path="/configuration" component={ConfigurationPage}/>
            <Route exact path="/" component={WalletPage}/>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
