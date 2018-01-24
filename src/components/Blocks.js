import React, { Component } from 'react';
import Block from './Block';
import Blockchain from './Blockchain';
import AccountsAndKeys from './AccountsAndKeys';
import {
  Route,
  Link,
  Redirect
} from 'react-router-dom';

class Blocks extends Component {
  constructor(props) {
    super(props);

    // blockchainInstance.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

    // Check if chain is valid (will return true)
    // console.log('Blockchain valid? ' + blockchainInstance.isChainValid());

    // Let's now manipulate the data
    // blockchainInstance.chain[1].data = { amount: 100 };

    // Check our chain again (will now return false)
    // console.log("Blockchain valid? " + blockchainInstance.isChainValid());
  }

  createBlock() {
    // let index = this.state.index + 1;
    let blockchain = this.props.blockchainInstance;
    blockchain.addBlock(new Block(blockchain.chain.length, Date.now(), { amount: 4 }));
    this.props.handleBlockchainUpdate(blockchain);
  }

  render() {
        // <Route path={`${this.props.match.url}/accounts-and-keys`} component={AccountsAndKeys}/>
    let blocks = [];
    if(this.props.blockchainInstance && this.props.blockchainInstance.chain.length) {
      this.props.blockchainInstance.chain.forEach((block) => {
        blocks.push(<Block block={block} key={block.hash} />);
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
