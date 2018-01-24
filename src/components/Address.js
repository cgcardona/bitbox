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
    console.log('show: ', key);
    this.setState({
      address: key,
      showPrivKey: true
    });
  }

  hideKey(key) {
    console.log('hide: ', key);
    this.setState({
      showPrivKey: false,
      address: key
    });
  }

  render() {
    let btn;
    let address;
    if(this.state.showPrivKey) {
      console.log('true');
      btn = <td><button onClick={this.hideKey.bind(this, this.props.address.public)}>Hide key</button></td>;
      address = <span className='danger'>{this.state.address}</span>;

    } else {
      console.log('fals');
      btn = <td><button onClick={this.showKey.bind(this, this.props.address.private)}>Show key</button></td>;
      address = <span className='success'>{this.state.address}</span>;
    }

    return (
      <tr className="Address">
        <td><span className='subheader'>ADDRESS</span> <br />{address}</td>
        <td><span className='subheader'>BALANCE</span> <br />0</td>
        <td><span className='subheader'>TX COUNT</span> <br />0</td>
        <td><span className='subheader'>INDEX</span> <br />{this.props.index}</td>
        {btn}
      </tr>
    );
  }
}

export default Address;
