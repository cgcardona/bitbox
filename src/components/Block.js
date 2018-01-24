import React, { Component } from 'react';
const SHA256 = require("crypto-js/sha256");

class Block extends Component {
  constructor(index, timestamp, data, previousHash = '') {
    super(index, timestamp, data, previousHash)
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }

  render() {

    let date = new Date(this.props.block.timestamp);
    return (
      <tr className="Block" onClick={this.props.handleBlockDetails.bind(this, this.props.block.index)}>
        <td><span className='subheader'>HEIGHT</span> <br />{this.props.block.index}</td>
        <td><span className='subheader'>MINED ON</span> <br />{date.toString()}</td>
        <td><span className='subheader'>HASH</span> <br />{this.props.block.hash}</td>
        <td><span className='subheader'>TX COUNT</span> <br />1</td>
      </tr>
    );
  }
}


export default Block;
