import React, { Component } from 'react';
import Block from '../models/Block';
import BlockDetails from './BlockDetails';
import {
  Redirect
} from 'react-router-dom';

class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      blockId: 0
    };

    // blockchainInstance.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

    // Check if chain is valid (will return true)
    // console.log('Blockchain valid? ' + blockchainInstance.isChainValid());

    // Let's now manipulate the data
    // blockchainInstance.chain[1].data = { amount: 100 };

    // Check our chain again (will now return false)
    // console.log("Blockchain valid? " + blockchainInstance.isChainValid());
  }


  createBlock() {
    let blockchainInstance = this.props.blockchainInstance;

    let tx = [{
      sender: 'coinbase',
      receiver: this.props.addresses[0].public,
      amount: 12.5
    }];

    let block = {
      index: blockchainInstance.chain.length,
      timestamp: Date.now(),
      transactions: tx,
      previousHash: blockchainInstance.getLatestBlock().hash
    };

    blockchainInstance.addBlock(new Block(block));
    this.props.handleBlockchainUpdate(blockchainInstance);
    this.updateUtxo(tx[0].receiver, tx[0].amount);
  }

  updateUtxo(receiver, amount) {
    let utxoSet = this.props.utxoSet;
    utxoSet.addUtxo(receiver, amount);
    this.props.handleUtxoUpdate(utxoSet);
  }

  handleBlockDetails(blockId) {
    this.setState({
      redirect: true,
      blockId: blockId
    })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect
        push
        to={{
          pathname: `${this.props.match.url}/${this.state.blockId}`,
          state: {
            block: this.props.blockchainInstance.chain[this.state.blockId]
          }
        }}
      />
    }

    let blocks = [];
    if(this.props.blockchainInstance && this.props.blockchainInstance.chain.length) {
      this.props.blockchainInstance.chain.forEach((block) => {
        blocks.push(
          <BlockDetails
            block={block}
            key={block.hash}
            match={this.props.match}
            handleBlockDetails={this.handleBlockDetails.bind(this)}
          />
        )
      });
    }

    return (
      <div className="Blocks">
        <div className="pure-u-1-1">
          <table className="pure-table">
            <tbody>
              <tr className="Block">
                <td>
                  <button className='pure-button' onClick={this.createBlock.bind(this)}><i className="fas fa-cube"></i> Create block</button>
                </td>
              </tr>
              {blocks}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Blocks;
