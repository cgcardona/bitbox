import Crypto from './Crypto';
import Bitcoin from 'bitcoinjs-lib';
import BIP39 from 'bip39';
import bchaddr from 'bchaddrjs';

class BitcoinCash {
  // Utility class to wrap the following bitcoin related npm packages
  // * https://github.com/bitcoinjs/bitcoinjs-lib
  // * https://github.com/bitcoinjs/bip39
  // * https://github.com/bitcoincashjs/bchaddrjs

  static Format = bchaddr.Format; // Legacy, Bitpay or Cashaddr.
  static Network = bchaddr.Network; // Mainnet or Testnet.
  static Type = bchaddr.Type; // P2PKH or P2SH.

  // Translate address from any address format into a specific format.
  static toLegacyAddress(address) {
    return bchaddr.toLegacyAddress(address);
  }

  static toBitpayAddress(address) {
    return bchaddr.toBitpayAddress(address);
  }

  static toCashAddress(address) {
    return bchaddr.toCashAddress(address);
  }

  // Test for address format.
  static isLegacyAddress(address) {
    return bchaddr.isLegacyAddress(address);
  }

  static isBitpayAddress(address) {
    return bchaddr.isBitpayAddress(address);
  }

  static isCashAddress(address) {
    return bchaddr.isCashAddress(address);
  }

  // Test for address network.
  static isMainnetAddress(address) {
    return bchaddr.isMainnetAddress(address);
  }

  static isTestnetAddress(address) {
    return bchaddr.isTestnetAddress(address);
  }

  // Test for address type.
  static isP2PKHAddress(address) {
    return bchaddr.isP2PKHAddress(address);
  }

  static isP2SHAddress(address) {
    return bchaddr.isP2SHAddress(address);
  }

  // Detect address format.
  static detectAddressFormat(address) {
    return bchaddr.detectAddressFormat(address);
  }

  // Detect address network.
  static detectAddressNetwork(address) {
    return bchaddr.detectAddressNetwork(address);
  }

  // Detect address type.
  static detectAddressType(address) {
    return bchaddr.detectAddressType(address);
  }

  static entropyToMnemonic() {
    return BIP39.entropyToMnemonic(Crypto.randomBytes());
  }

  static mnemonicToSeed(mnemonic) {
    return BIP39.mnemonicToSeed(mnemonic, '');
  }

  static fromSeedBuffer(seed) {
    return Bitcoin.HDNode.fromSeedBuffer(seed, Bitcoin.networks['bitcoin']);
  }

  static fromWIF(privateKey) {
    return Bitcoin.ECPair.fromWIF(privateKey);
  }

  static transactionBuilder() {
    return new Bitcoin.TransactionBuilder();
  }
}

export default BitcoinCash;
