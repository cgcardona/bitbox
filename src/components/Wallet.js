import React, { Component } from 'react';

class Wallet extends Component {

  showKey(privateAddress) {
    console.log(privateAddress);
  }
  render() {
    let list = [];
    if (this.props.addresses.length) {
      this.props.addresses.forEach((address, index) => {
        list.push(
          <tr key={address.public}>
              <td><span className='subheader'>ADDRESS</span> <br />{address.public}</td>
              <td><span className='subheader'>BALANCE</span> <br />0</td>
              <td><span className='subheader'>TX COUNT</span> <br />0</td>
              <td><span className='subheader'>INDEX</span> <br />{index}</td>
              <td><button onClick={this.showKey.bind(this, address.private)}>Show key</button></td>
          </tr>
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
            <li className='content-head right'>{"m/44'/60'/0'/0"}</li>
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
