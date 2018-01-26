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
      console.log(block);
      blockDetails = <BlockDetails
        block={block}
        key={block.hash}
        match={this.props.match}
        handleBlockDetails={this.handleBlockDetails.bind(this)}
      />
    }

    // let block = this.props.block;
    // let date = new Date(block.timestamp);
              // <tr className="Block">
              //   <td>
              //     <button className='pure-button'>Back</button>
              //   </td>
              //   <td>
              //     <h1 className="App-title">BlockchainDetails {block.index}</h1>
              //   </td>
              // </tr>
      // <tr className="BlockchainDetails" onClick={this.props.handleBlockchainDetails.bind(this, this.props.block.index)}>
      //   <td><span className='subheader'>HEIGHT</span> <br />{block.index}</td>
      //   <td><span className='subheader'>MINED ON</span> <br />{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</td>
      //   <td><span className='subheader'>HASH</span> <br />{block.hash}</td>
      //   <td><span className='subheader'>TX COUNT</span> <br />{block.transactions.length}</td>
      // </tr>
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
