import React, { Component } from 'react';
import moment from 'moment';
import {
  withRouter
} from 'react-router-dom';

class BlockDetails extends Component {
  render() {
    let block = this.props.block;
    let date = new Date(block.timestamp);
              // <tr className="Block">
              //   <td>
              //     <button className='pure-button'>Back</button>
              //   </td>
              //   <td>
              //     <h1 className="App-title">BlockDetails {block.index}</h1>
              //   </td>
              // </tr>
    return (
      <tr className="BlockDetails" onClick={this.props.handleBlockDetails.bind(this, this.props.block.index)}>
        <td><span className='subheader'>HEIGHT</span> <br />{block.index}</td>
        <td><span className='subheader'>MINED ON</span> <br />{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td><span className='subheader'>HASH</span> <br />{block.hash}</td>
        <td><span className='subheader'>TX COUNT</span> <br />{block.transactions.length}</td>
      </tr>
    );
  }
}

export default withRouter(BlockDetails);
