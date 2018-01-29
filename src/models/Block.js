import BlockHeader from './BlockHeader';
import SHA256 from "crypto-js/sha256";
import Crypto from '../utilities/Crypto';

class Block {
  constructor(blockData) {
    // console.log(blockData);
    this.index = blockData.index;
    this.magicNo = '0xD9B4BEF9';
    this.blocksize = 0;
    this.nonce = blockData.nonce;
    this.transactionCounter = blockData.transactions.length;
    this.transactions = blockData.transactions;
    this.timestamp = blockData.time;

    let blockHeaderData = {
      hashPrevBlock: blockData.previousHash,
      nonce: this.nonce,
      time: blockData.time,
      bits: blockData.bits,
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
      return Crypto.createSHA256Hash(data);
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
