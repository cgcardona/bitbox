import React, { Component } from 'react';

class AccountsAndKeys extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mnemonic: this.props.mnemonic,
      totalAccounts: this.props.totalAccounts,
      autogenerate: this.props.autogenerate
    }
  }

  handleMnemonicChange(e) {
    let value = e.target.value;
    this.setState({
      mnemonic: value
    })
   this.props.handleMnemonicChange(value);
  }

  handleTotalAccountsChange(e) {
    let value = e.target.value;
    this.setState({
      totalAccounts: value
    })
   this.props.handleTotalAccountsChange(value);
  }

  handleAutoGenerateChange(e) {
    let value = e.target.checked;
    this.setState({
      autogenerate: value
    })
    if(value) {
      this.setState({
        mnemonic: ''
      })
      this.props.handleMnemonicChange('');
    }
   this.props.handleAutoGenerateChange(value);
  }

  resetNibble() {
    this.props.resetNibble();
  }

  render() {
        // <p id='newRobotName'>Name: <input type='text' placeholder="Robot Name" value={this.state.robotName} onChange={this.handleRobotNameChange.bind(this)} /></p>
    let customMnemonic;
    let customMnemonicLabel;
    if(!this.state.autogenerate) {
      customMnemonicLabel = <label for="name">Enter the Mnemonic you wish to use</label>;
      customMnemonic = <input type='text' placeholder="Enter mnemonic to use" value={this.state.mnemonic} onChange={this.handleMnemonicChange.bind(this)} />;
    }

    return (
      <div className="AccountsAndKeys">
        <h2 className="content-head is-center">Accounts & Keys</h2>
        <div className="pure-g">
          <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
            <form className="pure-form pure-form-stacked">
              <fieldset>
                <button className="pure-button" onClick={this.resetNibble.bind(this)}>Restart</button>


                <label for="name">Total number of accounts to generate</label>
                <input type='number' placeholder="Number of accounts" value={this.state.totalAccounts} onChange={this.handleTotalAccountsChange.bind(this)} />

                <label for="name">Autogenerate HD Mnemonie</label>
                <input type="checkbox" checked={this.state.autogenerate} onChange={this.handleAutoGenerateChange.bind(this)} />

                {customMnemonicLabel}
                {customMnemonic}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountsAndKeys;
