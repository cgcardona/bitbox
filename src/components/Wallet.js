import React, { Component } from 'react';
import Address from './Address';
import _ from 'underscore';

class Wallet extends Component {
  render() {
    let list = [];
    if (this.props.addresses.length) {
      this.props.addresses.forEach((address, index) => {
        // get balances
        let outputs = _.where(this.props.utxoSet.state.outputs, {receiver: address.public});
        let balance = 0;
         _.each(outputs, (output, index) => {
           balance += output.amount;
         });

        // get transactions
        let transactions = [];
        _.each(this.props.blockchainInstance.chain, (block, index) => {
          transactions.push(_.where(block.transactions, {sender: address.public}));
          transactions.push(_.where(block.transactions, {receiver: address.public}));
        });

        let transactionsCount = 0;
        _.each(transactions, (transaction, index) => {
          transactionsCount += transaction.length;
        });

        list.push(
          <Address
            address={address}
            index={index}
            key={index}
            balance={balance}
            transactionsCount={transactionsCount}
            // showKey={this.showKey.bind(this)}
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
