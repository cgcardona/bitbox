import React, { Component } from 'react';
import BitcoinCash from '../utilities/BitcoinCash';
import Crypto from '../utilities/Crypto';
import AddressDetails from './AddressDetails';
import _ from 'underscore';

class Wallet extends Component {
  render() {
    // console.log(this.props.utxoSet);
    let list = [];
    if (this.props.addresses.length) {
      this.props.addresses.forEach((address, index) => {
        // get balances
        let publicKey = BitcoinCash.fromWIF(address.privateKeyWIF).getAddress();
        let ripemd160 = Crypto.createRIPEMD160Hash(publicKey);

        let outputs = _.where(this.props.utxoSet.outputs, {address: publicKey});
        let balance = 0;
         _.each(outputs, (output, index) => {
           balance += output.value;
         });

        // get transactions
        let transactions = [];
        _.each(this.props.blockchainInstance.chain, (block, index) => {
          _.each(block.transactions, (transaction, index) => {
            transactions.push(_.where(transaction.inputs, {ripemd160: ripemd160}));
            transactions.push(_.where(transaction.outputs, {ripemd160: ripemd160}));
          });
        });

        let transactionsCount = 0;
        _.each(transactions, (transaction, index) => {
          transactionsCount += transaction.length;
        });

        list.push(
          <AddressDetails
            address={address}
            index={index}
            key={index}
            balance={balance}
            transactionsCount={transactionsCount}
            displayCashaddr={this.props.displayCashaddr}
          />
        );
      });
    }

    return (
      <div className="Wallet content pure-g">
        <div className="pure-u-1-1">
          <ul className='subheader'>
            <li className=''>MNEMONIC</li>
            <li className='right'>HD PATH</li>
          </ul>
          <ul className='subheader'>
            <li className='content-head'>{this.props.mnemonic}</li>
            <li className='content-head right'>{this.props.path}</li>
          </ul>
          <table className="pure-table">
            <tbody>
              {list}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Wallet;
