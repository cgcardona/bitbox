import React, { Component } from 'react';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: this.props.address.public,
      showPrivKey: false,
      balance: 0
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
      btn = <td><button className="pure-button danger-background" onClick={this.hideKey.bind(this, this.props.address.public)}>Hide key</button></td>;
      address = <span className='danger'>{this.state.address}</span>;
    } else {
      btn = <td><button className="pure-button" onClick={this.showKey.bind(this, this.props.address.private)}>Show key</button></td>;
      address = <span className='success'>{this.state.address}</span>;
    }

    return (
      <tr className="Address">
        <td><span className='subheader'>ADDRESS</span> <br />{address}</td>
        <td><span className='subheader'>BALANCE</span> <br />{this.state.balance} BCH</td>
        <td><span className='subheader'>TX COUNT</span> <br />0</td>
        <td><span className='subheader'>INDEX</span> <br />{this.props.index}</td>
        {btn}
      </tr>
    );
  }
}

export default Address;
