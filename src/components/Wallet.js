import React, { Component } from 'react';
import Address from './Address';

class Wallet extends Component {
  render() {
    let list = [];
    if (this.props.addresses.length) {
      this.props.addresses.forEach((address, index) => {
        list.push(
          <Address
            address={address}
            index={index}
            key={index}
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
          <ul className='header'>
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
