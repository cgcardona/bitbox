import React, { Component } from 'react';

class Wallet extends Component {
  render() {
    let list = [];
    if (this.props.addresses.length) {
      this.props.addresses.forEach(address => {
        list.push(<li key={address}>Address: {address} | Balance: 0 | TX Count: 0 |</li>);
      });
    }

    return (
      <div className="Wallet pure-g">
        <div className="pure-u-1-1">
          <h1 className="">{this.props.mnemonic}</h1>
          <ul>{list}</ul>
        </div>
      </div>
    );
  }
}

export default Wallet;
