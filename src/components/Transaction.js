import React, { Component } from 'react';

class Transaction extends Component {
  constructor(sender, receiver, amount) {
    super(sender, receiver, amount);
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
  }

  render() {
    return (
      <tr className="Transaction">
        <td><span className='subheader'>Transaction</td>
      </tr>
    );
  }
}

export default Block;
