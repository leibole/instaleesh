import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

class NewBoardDialog extends React.Component {
  state = { boardName: "" };
  render() {
    const actions = [
      <FlatButton label="Cancel" onClick={this.props.closeNewBoard} />,
      <FlatButton label="Create" primary={true} onClick={this.addNewBoard} />
    ];

    return (
      <Dialog
        title="Fancy New Board"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.closeNewBoard}
      >
        Select a name for your new Board.
        <br />
        <TextField
          hintText="Board Name"
          autoFocus
          type="text"
          value={this.state.boardName}
          onChange={this.handleNameChange}
          ref={focusUsernameInputField}
        />
      </Dialog>
    );
  }

  handleNameChange = e => {
    this.setState({ boardName: e.target.value });
  };

  addNewBoard = () => {
    this.props.addNewBoard(this.state.boardName);
  };
}

const focusUsernameInputField = input => {
  if (input) {
    setTimeout(() => {
      input.focus();
    }, 300);
  }
};

export default NewBoardDialog;
