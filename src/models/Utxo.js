class Utxo {
  constructor(address, value) {
    this.outputs = [{
      address: address,
      value: value
    }];
  }

  addUtxo(address, value) {
    let outputs = this.outputs;
    outputs.push({
      address: address,
      value: value
    })
  }
}

export default Utxo;
