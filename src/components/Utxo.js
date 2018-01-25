import React, { Component } from 'react';

class Utxo extends Component {
  constructor(receiver, amount) {
    super(receiver, amount);

    this.state = {
      outputs: [{
        receiver: receiver,
        amount: amount
      }]
    };
  }

  addUtxo(receiver, amount) {
    let outputs = this.state.outputs;
    outputs.push({
      receiver: receiver,
      amount: amount
    })

    this.setState({
      outputs: outputs
    })
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
