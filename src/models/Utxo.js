class Utxo {
  constructor(receiver, amount) {
    this.outputs = [{
      receiver: receiver,
      amount: amount
    }];
  }

  addUtxo(receiver, amount) {
    let outputs = this.outputs;
    outputs.push({
      receiver: receiver,
      amount: amount
    })
  }
}

export default Utxo;
