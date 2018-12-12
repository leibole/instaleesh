import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

class NewCustomer extends React.Component {
  state = { boardName: "" };
  render() {
    const actions = [
      <FlatButton label="Cancel" onClick={this.props.closeNewCustomer} />,
      <FlatButton label="Create" primary={true} onClick={this.addNewCustomer} />
    ];

    return (
      <Dialog
        title="Congrats! Add a New Customer"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.closeNewCustomer}
      >
        Select a name for your new Board.
        <br />
        <TextField
          hintText="New Customer Name"
          autoFocus
          type="text"
          value={this.state.customerName}
          onChange={this.handleNameChange}
          ref={focusUsernameInputField}
        />
      </Dialog>
    );
  }

  handleNameChange = e => {
    this.setState({ customerName: e.target.value });
  };

  addNewCustomer = () => {
    this.props.addNewCustomer(this.state.customerName);
  };
}

const focusUsernameInputField = input => {
  if (input) {
    setTimeout(() => {
      input.focus();
    }, 100);
  }
};

export default NewCustomer;
