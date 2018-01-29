class Input {
  constructor(inputData) {
    this.previousTransactionHash = inputData.previousTransactionHash;
    this.previousTxoutIndex = inputData.previousTxoutIndex;
    this.txinScriptLength = inputData.txinScriptLength;
    this.scriptSig = inputData.scriptSig;
    this.sequenceNo = inputData.sequenceNo;
  }
}

export default Input;
