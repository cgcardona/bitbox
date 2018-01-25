import React, { Component } from 'react';
import Block from './Block';

class Blockchain extends Component {
  constructor(index, timestamp, transactions, previousHash) {
    super(index, timestamp, transactions, previousHash);
    this.chain = [this.createGenesisBlock(index, timestamp, transactions, previousHash)];
    this.difficulty = 0;
  }

  createGenesisBlock(index, timestamp, transactions, previousHash) {
    return new Block(index, timestamp, transactions, previousHash);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
      }
    }
    return true;
  }

  render() {
    return (
      <div className="Block">
        block
      </div>
    );
  }
}

export default Blockchain;
