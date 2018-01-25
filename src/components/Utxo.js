import React, { Component } from 'react';

class Utxo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outputs: []
    }
  }

  render() {
    return (
      <div className="Utxo">
        <h1 className="App-title">Unspent Transaction Outputs: {this.state.outputs}</h1>
      </div>
    );
  }
}

export default Utxo;
