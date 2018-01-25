import React, { Component } from 'react';
import Block from './Block';
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
    let blockchain = this.props.blockchainInstance;
    blockchain.addBlock(new Block(blockchain.chain.length, Date.now(), { amount: 4 }));
    this.props.handleBlockchainUpdate(blockchain);
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
          <Block
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
                  <button className='pure-button' onClick={this.createBlock.bind(this)}>Create block</button>
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
