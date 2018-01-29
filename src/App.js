// react imports
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';

// custom models
import Blockchain from './models/Blockchain';
import Address from './models/Address';
import Block from './models/Block';
import Transaction from './models/Transaction';
import Input from './models/Input';
import Output from './models/Output';

// custom components
import Wallet from './components/Wallet';
import Blocks from './components/Blocks';
import BlockDetails from './components/BlockDetails';
import AddressDetails from './components/AddressDetails';
import Transactions from './components/Transactions';
import Utxo from './models/Utxo';
import Configuration from './components/Configuration';

// utilities
import Crypto from './utilities/Crypto';
import BitcoinCash from './utilities/BitcoinCash';

// css
import './App.css';

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
      displayCashaddr: true,
      configuration: {
        wallet: {
          createNewWallet: true,
          network: 'bitcoin'
        }
      },
      showCreateBtn: false
    };
  }

  componentDidMount() {
    if(this.state.configuration.wallet.createNewWallet) {
      let [mnemonic, path, addresses] = BitcoinCash.createHDWallet({
        totalAccounts: this.totalAccounts,
        autogenerateMnemonic: this.autogenerateMnemonic,
        autogeneratePath: this.autogeneratePath
      });
      let config = this.state.configuration;
      this.setState({
        mnemonic: mnemonic,
        path: path,
        addresses: addresses,
        configuration: config
      });
      this.createBlockchain(addresses);
    }
  }

  rng() {
    return Buffer.from('YT8dAtK4d16A3P1z+TpwB2jJ4aFH3g9M1EioIBkLEV4=', 'base64')
  }

  createBlockchain(addresses) {

    //
    // // create new tx
    // let owner = Bitcoin.ECPair.fromWIF(addresses[1].privateKey);
    // let newTxb = new Bitcoin.TransactionBuilder();
    //
    // newTxb.addInput(txHash, 0);
    // newTxb.addOutput(addresses[2].publicKey, 12000);
    // newTxb.sign(0, owner)
    // let newTxHex = newTxb.build().toHex();
    // console.log(newTxHex);

    // let testnet = Bitcoin.networks.testnet;
    // var txb = new Bitcoin.TransactionBuilder(testnet)
    // var alice1 = Bitcoin.ECPair.makeRandom({ network: testnet })
    // var aliceChange = Bitcoin.ECPair.makeRandom({ rng: this.rng, network: testnet })
    //
    //
    // console.log(alice1, aliceChange);

    // GetHash()      =
    // hashMerkleRoot = 0x4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b
    // txNew.vin[0].scriptSig     = 486604799 4 0x736B6E616220726F662074756F6C69616220646E6F63657320666F206B6E697262206E6F20726F6C6C65636E61684320393030322F6E614A2F33302073656D695420656854
    // txNew.vout[0].nValue       = 5000000000
    // txNew.vout[0].scriptPubKey = 0x5F1DF16B2B704C8A578D0BBAF74D385CDE12C11EE50455F3C438EF4C3FBCF649B6DE611FEAE06279A60939E028A8D65C10B73071A6F16719274855FEB0FD8A6704 OP_CHECKSIG
    // block.nVersion = 1
    // block.nTime    = 1231006505
    // block.nBits    = 0x1d00ffff
    // block.nNonce   = 2083236893
    //
    //
    // CBlock(hash=000000000019d6, ver=1, hashPrevBlock=00000000000000, hashMerkleRoot=4a5e1e, nTime=1231006505, nBits=1d00ffff, nNonce=2083236893, vtx=1)
    //   CTransaction(hash=4a5e1e, ver=1, vin.size=1, vout.size=1, nLockTime=0)
    //     CTxIn(COutPoint(000000, -1), coinbase 04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73)
    //     CTxOut(nValue=50.00000000, scriptPubKey=0x5F1DF16B2B704C8A578D0B)
    // vMerkleTree: 4a5e1e

    let genesisTx = new Transaction({
      versionNumber: 1,
      inputs: [],
      outputs: [addresses[0] ],
      time: Date.now()
    }, true);

    let genesisBlock = {
      hash: '0x000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
      version: 1,
      hashPrevBlock: '00000000000000',
      hashMerkleRoot: '0x4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
      time: 1231006505,
      bits: '0x1d00ffff',
      nonce: '2083236893',
      vtx: 1,

      index: 0,
      transactions: [genesisTx],
      previousHash: '00000000000000'
    };
    let blockchainInstance = new Blockchain(genesisBlock);

    let utxoSet = new Utxo(genesisBlock.transactions[0].receiver, genesisBlock.transactions[0].amount);
    // console.log(blockchainInstance);
    let coinbase = BitcoinCash.fromWIF(addresses[0].privateKey);
    let txb = BitcoinCash.transactionBuilder();

    // console.log(genesisTx.createTransactionHash(genesisTx));
    txb.addInput(Crypto.createSHA256Hash(genesisTx), 0);
    // f5a5ce5988cc72b9b90e8d1d6c910cda53c88d2175177357cc2f2cf0899fbaad
    txb.addOutput(addresses[1].publicKey, 12000);

    txb.sign(0, coinbase)
    let txHex = txb.build().toHex();
    // console.log(txHex)
    let txHash = Crypto.createSHA256Hash(txHex);
    // console.log(txHash);

    this.handleBlockchainUpdate(blockchainInstance);
    this.handleUtxoUpdate(utxoSet);
  }

  resetBitbox(config) {
    config.totalAccounts = this.totalAccounts;

    if(!config.mnemonic && this.mnemonic !== '') {
      config.mnemonic = this.mnemonic;
    }

    if(!config.autogenerateMnemonic && this.autogenerateMnemonic !== false) {
      config.autogenerateMnemonic = this.autogenerateMnemonic;
    }

    if(!config.autogeneratePath && this.autogeneratePath === false) {
      config.autogeneratePath = this.autogeneratePath;
      config.path = this.path;
    }
    let [mnemonic, path, addresses] = BitcoinCash.createHDWallet(config);
    this.setState({
      mnemonic: mnemonic,
      path: path,
      addresses: addresses
    });
    this.createBlockchain(addresses);
  }

  handleMnemonicChange(mnemonic) {
    this.mnemonic = mnemonic;
  }

  handlePathChange(path) {
    this.path = path;
  }

  handleTotalAccountsChange(totalAccounts) {
    this.totalAccounts = +totalAccounts;
  }

  handleAutoGenerateMnemonicChange(autogenerateMnemonic) {
    this.autogenerateMnemonic = autogenerateMnemonic;
  }

  handleAutoGeneratePathChange(autogeneratePath) {
    this.autogeneratePath = autogeneratePath;
  }

  handleDisplayCashaddrChange(displayCashaddr) {
    this.setState({
      displayCashaddr: displayCashaddr
    });
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

  createBlock() {
    let blockchainInstance = this.state.blockchainInstance;

    let tx = {
      inputs: [],
      outputs: [],
      sender: 'coinbase',
      receiver: this.state.addresses[0].publicKey,
      amount: 12.5,
      timestamp: Date.now()
    };

    let block = {
      index: blockchainInstance.chain.length,
      timestamp: Date.now(),
      transactions: [tx],
      previousHash: blockchainInstance.getLatestBlock().blockheader.hashMerkleRoot
    };

    blockchainInstance.addBlock(new Block(block));
    this.handleBlockchainUpdate(blockchainInstance);
    this.updateUtxo(tx.receiver, tx.amount);
  }

  updateUtxo(receiver, amount) {
    let utxoSet = this.state.utxoSet;
    utxoSet.addUtxo(receiver, amount);
    this.handleUtxoUpdate(utxoSet);
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
          displayCashaddr={this.state.displayCashaddr}
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

    const BlockPage = (props) => {
      return (
        <BlockDetails
          blockchainInstance={this.state.blockchainInstance}
          match={props.match}
        />
      );
    };

    const AddressPage = (props) => {
      return (
        <AddressDetails
          blockchainInstance={this.state.blockchainInstance}
          match={props.match}
        />
      );
    };

    const TransactionsPage = (props) => {
      return (
        <Transactions
          addresses={this.state.addresses}
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
          displayCashaddr={this.state.displayCashaddr}
          autogenerateMnemonic={this.autogenerateMnemonic}
          autogeneratePath={this.autogeneratePath}
          handleTotalAccountsChange={this.handleTotalAccountsChange.bind(this)}
          handleMnemonicChange={this.handleMnemonicChange.bind(this)}
          handlePathChange={this.handlePathChange.bind(this)}
          handleAutoGenerateMnemonicChange={this.handleAutoGenerateMnemonicChange.bind(this)}
          handleAutoGeneratePathChange={this.handleAutoGeneratePathChange.bind(this)}
          handleDisplayCashaddrChange={this.handleDisplayCashaddrChange.bind(this)}
        />
      );
    };
    let chainlength = 0;
    if(this.state.blockchainInstance.chain) {
      chainlength = this.state.blockchainInstance.chain.length - 1;
    }

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
            <div className="pure-menu pure-menu-horizontal networkInfo">
              <ul className="pure-menu-list">

                <li className="pure-menu-item">
                  CURRENT BLOCK <br />
                  {chainlength}
                </li>
                <li className="pure-menu-item">
                  RPC SERVER <br /> http://127.0.0.1:8332
                </li>
                <li className="pure-menu-item">
                  MINING STATUS <br /> AUTOMINING <i className="fas fa-spinner fa-spin" />
                </li>
                <li className="pure-menu-item">
                  <button className='pure-button danger-background' onClick={this.createBlock.bind(this)}><i className="fas fa-cube"></i> Create block</button>
                </li>
              </ul>
            </div>
          </div>

          <Switch>
            <Route exact path="/blocks" component={BlocksPage}/>
            <Route path="/blocks/:block_id" component={BlockPage}/>
            <Route path="/addresses/:address_id" component={AddressPage}/>
            <Route path="/transactions" component={TransactionsPage}/>
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
