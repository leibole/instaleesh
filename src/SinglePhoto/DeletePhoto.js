import React from "react";
import Dialog from "material-ui/Dialog";
import Delete from "material-ui/svg-icons/action/delete";
import FlatButton from "material-ui/FlatButton";
import firebase from "../firebase";
import { connect } from "react-redux";

class DeletePhoto extends React.Component {
  state = { open: false };
  render() {
    const actions = [
      <FlatButton label="Cancel" onClick={this.closeDialog} />,
      <FlatButton label="Please Do" primary={true} onClick={this.deleteImage} />
    ];

    return (
      <span
        style={{
          zIndex: "1000",
          position: "relative",
          color: "black",
          top: "6px",
          left: "15px"
        }}
      >
        <Delete
          onClick={this.openDialog}
          style={{
            cursor: "pointer",
            backgroundColor: "white",
            color: "black",
            opacity: 0.3
          }}
        />
        <Dialog
          title="Really delete this image?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.props.closeNewBoard}
        />
      </span>
    );
  }

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  deleteImage = () => {
    firebase
      .database()
      .ref(
        "/designers/" +
          this.props.designer +
          "/clients/" +
          this.props.client +
          "/boards/" +
          this.props.board +
          "/images/" +
          this.props.imageId
      )
      .remove()
      .then(this.setState({ open: false }), error => {
        console.error(error);
      });
  };
}

const mapStateToProps = state => {
  return {
    board: state.board,
    client: state.client,
    designer: state.designer
  };
};

export default connect(mapStateToProps)(DeletePhoto);
