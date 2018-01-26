import React, { Component } from 'react';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: this.props.address.public,
      showPrivKey: false
    }
  }

  showKey(key) {
    this.setState({
      address: key,
      showPrivKey: true
    });
  }

  hideKey(key) {
    this.setState({
      showPrivKey: false,
      address: key
    });
  }

  render() {
    let btn;
    let address;
    if(this.state.showPrivKey) {

      btn = <td><button className="pure-button danger-background" onClick={this.hideKey.bind(this, this.props.address.public)}><i className="fas fa-key" /></button></td>;
      address = <span className='danger'>{this.state.address}</span>;
    } else {
      btn = <td><button className="pure-button" onClick={this.showKey.bind(this, this.props.address.private)}><i className="fas fa-key" /></button></td>;
      address = <span className='success'>{this.state.address}</span>;
    }

    let coinbase;
    if(this.props.index === 0) {
      coinbase = <span> <i className="fas fa-asterisk" /> Coinbase</span>
    }

    return (
      <tr className="Address">
        <td className='important'><span className='subheader'>ADDRESS{coinbase}</span> <br />{address}</td>
        <td className='important'><span className='subheader'>BALANCE</span> <br />{this.props.balance} BCH</td>
        <td><span className='subheader'>TX COUNT</span> <br />{this.props.transactionsCount}</td>
        <td><span className='subheader'>INDEX</span> <br />{this.props.index}</td>
        {btn}
      </tr>
    );
  }
}

export default Address;
