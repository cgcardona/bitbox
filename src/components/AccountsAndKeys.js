import React, { Component } from 'react';

class AccountsAndKeys extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mnemonic: this.props.mnemonic,
      path: this.props.path,
      totalAccounts: this.props.totalAccounts,
      autogenerateMnemonic: this.props.autogenerateMnemonic,
      autogeneratePath: this.props.autogeneratePath
    }
  }

  handleMnemonicChange(e) {
    let value = e.target.value;
    this.setState({
      mnemonic: value
    })
   this.props.handleMnemonicChange(value);
  }

  handlePathChange(e) {
    let value = e.target.value;
    this.setState({
      path: value
    })
   this.props.handlePathChange(value);
  }

  handleTotalAccountsChange(e) {
    let value = e.target.value;
    this.setState({
      totalAccounts: value
    })
   this.props.handleTotalAccountsChange(value);
  }

  handleAutoGenerateMnemonicChange(e) {
    let value = e.target.checked;
    this.setState({
      autogenerateMnemonic: value
    })
    if(value) {
      this.setState({
        mnemonic: ''
      })
      this.props.handleMnemonicChange('');
    }
   this.props.handleAutoGenerateMnemonicChange(value);
  }

  handleAutoGeneratePathChange(e) {
    let value = e.target.checked;
    this.setState({
      autogeneratePath: value
    })
    if(value) {
      this.setState({
        path: ''
      })
      this.props.handlePathChange('');
    }
   this.props.handleAutoGeneratePathChange(value);
  }

  render() {
        // <p id='newRobotName'>Name: <input type='text' placeholder="Robot Name" value={this.state.robotName} onChange={this.handleRobotNameChange.bind(this)} /></p>
    let customMnemonicLabel;
    let customMnemonic;
    if(!this.state.autogenerateMnemonic) {
      customMnemonicLabel = <label>Enter the Mnemonic you wish to use</label>;
      customMnemonic = <input type='text' placeholder="Enter mnemonic to use" value={this.state.mnemonic} onChange={this.handleMnemonicChange.bind(this)} />;
    }
    //
    let customPathLabel;
    let customPath;
    if(!this.state.autogeneratePath) {
      customPathLabel = <input type='text' placeholder="Enter HD path to use" value={this.state.path} onChange={this.handlePathChange.bind(this)} />;
      customPath = <label>Enter the HD path you wish to use</label>;
    }

    return (
      <div className="AccountsAndKeys">
        <h2 className="content-head is-center">Accounts & Keys</h2>
        <div className="pure-g">
          <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
            <form className="pure-form pure-form-stacked">
              <fieldset>
                <button className="pure-button" onClick={this.props.resetNibble.bind(this)}>Restart</button>


                <label>Total number of accounts to generate</label>
                <input type='number' placeholder="Number of accounts" value={this.state.totalAccounts} onChange={this.handleTotalAccountsChange.bind(this)} />

                <label>Autogenerate HD Mnemonic</label>
                <input type="checkbox" checked={this.state.autogenerateMnemonic} onChange={this.handleAutoGenerateMnemonicChange.bind(this)} />
                {customMnemonicLabel}
                {customMnemonic}

                <label>Autogenerate HD Path</label>
                <input type="checkbox" checked={this.state.autogeneratePath} onChange={this.handleAutoGeneratePathChange.bind(this)} />

                {customPathLabel}
                {customPath}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountsAndKeys;
