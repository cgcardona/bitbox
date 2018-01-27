import BlockHeader from './BlockHeader';
import SHA256 from "crypto-js/sha256";
import crypto from 'crypto';

class Block {
  constructor(blockData) {
    this.index = blockData.index;
    this.transactions = blockData.transactions;
    this.nonce = 0;
    this.transactionCounter = 0;
    this.magicNo = '0xD9B4BEF9';
    this.blocksize = 0;
    this.timestamp = blockData.timestamp;

    let blockHeaderData = {
      hashPrevBlock: blockData.previousHash,
      nonce: this.nonce,
      time: blockData.timestamp,
      bits: 0,
      hashMerkleRoot: this.calculateMerkle()
    };
    this.blockheader = new BlockHeader(blockHeaderData);
  }

  calculateMerkle() {
    let txs = this.transactions.map((tx) => {
      return tx = this.calculateHash(`${tx.sender}${tx.receiver}${tx.amount}${tx.timestamp}`);
    });
    let data = txs.map(x => new Buffer(x, 'hex'))

    let fastRoot = require('merkle-lib/fastRoot');
    let root = fastRoot(data, (data) => {
      return crypto.createHash('sha256').update(data).digest();
    });
    return root.toString('hex');
  }

  calculateHash(data) {
    return SHA256(data).toString();
  }

  mineBlock(difficulty) {
    while (this.blockheader.hashMerkleRoot.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.blockheader.hashMerkleRoot = this.calculateMerkle();
    }
    console.log("BLOCK MINED: " + this.blockheader.hashMerkleRoot);
  }
}

export default Block;
