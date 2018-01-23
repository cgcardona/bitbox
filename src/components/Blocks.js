import React, { Component } from 'react';
import Block from './Block';
import Blockchain from './Blockchain';

class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitcoinCashBlockchain: '',
      index: 0
    };

    // bitcoinCashBlockchain.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

    // Check if chain is valid (will return true)
    // console.log('Blockchain valid? ' + bitcoinCashBlockchain.isChainValid());

    // Let's now manipulate the data
    // bitcoinCashBlockchain.chain[1].data = { amount: 100 };

    // Check our chain again (will now return false)
    // console.log("Blockchain valid? " + bitcoinCashBlockchain.isChainValid());
  }

  componentDidMount() {
    let BlockchainInstance= new Blockchain(0, Date.now(), {amount: "Chancellor on the brink of bailouts"}, "0");
    let chain = BlockchainInstance.chain;
    this.setState({
      bitcoinCashBlockchain: BlockchainInstance,
      chain: chain
    });
  }

  createBlock() {
    let index = this.state.index + 1;
    let blockchain = this.state.bitcoinCashBlockchain;
    blockchain.addBlock(new Block(index, Date.now(), { amount: 4 }));
    this.setState({
      index: index,
      chain: blockchain.chain
    });
  }

  render() {
    let blocks = [];
    if(this.state.bitcoinCashBlockchain && this.state.bitcoinCashBlockchain.chain.length) {
      this.state.bitcoinCashBlockchain.chain.forEach((block) => {
        blocks.push(<div key={block.index}>
          <p> Index: {block.index} </p>
          <p> Previous Hash: {block.previousHash} </p>
          <p> Timestamp: {block.timestamp} </p>
          <p> Data: {block.data.amount} </p>
          <p> Hash: {block.hash} </p>
          </div>
        );
      });
    }
    return (
      <div className="Blocks">
        <h1 className="App-title">Blocks</h1>
        <p className="App-intro">
          <button onClick={this.createBlock.bind(this)}>Create block</button>
        </p>
        {blocks}
      </div>
    );
  }
}

export default Blocks;
