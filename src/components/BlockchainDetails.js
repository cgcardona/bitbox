import React, { Component } from 'react';
import BlockDetails from './BlockDetails';
import moment from 'moment';
import {
  withRouter
} from 'react-router-dom';

class BlockchainDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockId: 0
    };
  }

  handleBlockDetails(blockId) {
    this.setState({
      blockId: blockId
    })
  }
  render() {
    let blockDetails;
    if(this.props.blockchainInstance && this.props.blockchainInstance.chain.length) {
      let block = this.props.blockchainInstance.chain[this.props.match.params.block_id];
      blockDetails = <BlockDetails
        block={block}
        key={block.hash}
        match={this.props.match}
        handleBlockDetails={this.handleBlockDetails.bind(this)}
      />
    }
    return (

      <div className="Wallet content pure-g">
        <div className="pure-u-1-1">
          <table className="pure-table">
            <tbody>
              {blockDetails}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default withRouter(BlockchainDetails);
