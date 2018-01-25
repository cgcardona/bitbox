import React, { Component } from 'react';
import moment from 'moment';
import SHA256 from "crypto-js/sha256";

class Block extends Component {
  constructor(index, timestamp, transactions, previousHash = '') {
    super(index, timestamp, transactions, previousHash);
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(`${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.transactions)}${this.nonce}`).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED: " + this.hash);
  }

  render() {
    let date = new Date(this.props.block.timestamp);
    return (
      <tr className="Block" onClick={this.props.handleBlockDetails.bind(this, this.props.block.index)}>
        <td><span className='subheader'>HEIGHT</span> <br />{this.props.block.index}</td>
        <td><span className='subheader'>MINED ON</span> <br />{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td><span className='subheader'>HASH</span> <br />{this.props.block.hash}</td>
        <td><span className='subheader'>TX COUNT</span> <br />1</td>
      </tr>
    );
  }
}

export default Block;
