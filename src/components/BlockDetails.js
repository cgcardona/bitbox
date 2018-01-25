import React, { Component } from 'react';
import {
  withRouter
} from 'react-router-dom';

class BlockDetails extends Component {
  render() {
    let block = this.props.location.state.block;
    let date = new Date(block.timestamp);
    return (
      <div className="BlockDetails">
        <div className="pure-u-1-1">
          <table className="pure-table">
            <tbody>
              <tr className="Block">
                <td>
                  <button className='pure-button'>Back</button>
                </td>
                <td>
                  <h1 className="App-title">BlockDetails {block.index}</h1>
                </td>
              </tr>
              <tr className="Block">
                <td><span className='subheader'>HEIGHT</span> <br />{block.index}</td>
                <td><span className='subheader'>MINED ON</span> <br />{date.toString()}</td>
                <td><span className='subheader'>HASH</span> <br />{block.hash}</td>
                <td><span className='subheader'>TX COUNT</span> <br />1</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}

export default withRouter(BlockDetails);
