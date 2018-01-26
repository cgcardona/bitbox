import SHA256 from "crypto-js/sha256";

class Block {
  constructor(blockData) {
    this.index = blockData.index;
    this.previousHash = blockData.previousHash;
    this.timestamp = blockData.timestamp;
    this.transactions = blockData.transactions;
    this.hash = this.calculateHash();
    this.nonce = 0;

    this.magicNo = '0xD9B4BEF9';
    this.blocksize = 0;
    this.blockheader = {

    }
    this.transactionCounter = 0;
  }

  calculateHash() {
    return SHA256(`${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.transactions)}${this.nonce}`).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED: " + this.hash);
  }
}

export default Block;
