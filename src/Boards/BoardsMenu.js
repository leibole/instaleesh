import React from "react";
import IconMenu from "material-ui/IconMenu";
// import Delete from "material-ui/svg-icons/action/delete";
import NewReleases from "material-ui/svg-icons/av/new-releases";
import MenuItem from "material-ui/MenuItem";
import Menu from "material-ui/svg-icons/navigation/menu";
import IconButton from "material-ui/IconButton";
import { connect } from "react-redux";
import firebase from "../firebase";
import NewBoardDialog from "./NewBoardDialog";

class BoardsMenu extends React.Component {
  state = { boards: {}, newBoardOpen: false };
  render() {
    return (
      <React.Fragment>
        <IconMenu
          iconButtonElement={
            <IconButton
              style={{ width: 70, height: 70, color: "black" }}
              iconStyle={{
                width: 70,
                height: 70,
                padding: 14,
                color: "black"
              }}
            >
              <Menu style={{ fill: "black" }} />
            </IconButton>
          }
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          onChange={this.handleChangeBoard}
          value={this.props.board}
        >
          <MenuItem value="home" primaryText="Home" />
          <MenuItem value="_new_" primaryText="Add New Board">
            <span style={{ float: "right" }}>+</span>
          </MenuItem>
          {Object.keys(this.props.boards).map(boardName => {
            return (
              this.props.boards[boardName].label && (
                <MenuItem
                  key={boardName}
                  value={boardName}
                  primaryText={
                    <div>
                      {this.props.boards[boardName].label}(
                      {(this.props.boards[boardName].images &&
                        Object.keys(this.props.boards[boardName].images)
                          .length) ||
                        0}
                      )
                      {!this.hasUserSeenImages(boardName) && (
                        <NewReleases
                          style={{ height: "18px", color: "rgb(0, 151, 167)" }}
                        />
                      )}
                    </div>
                  }
                  style={{ display: "inline" }}
                >
                  {/* <span style={{ float: "right" }}>
                    <Delete
                      onClick={this.removeBoard.bind(this, boardName)}
                      style={{ height: "18px" }}
                    />
                  </span> */}
                </MenuItem>
              )
            );
          })}
        </IconMenu>
        <NewBoardDialog
          open={this.state.newBoardOpen}
          closeNewBoard={this.closeNewBoard}
          addNewBoard={this.addNewBoard}
        />
      </React.Fragment>
    );
  }

  removeBoard = boardName => {
    var boardsRef = firebase.database().ref(this.getBoardsRef() + boardName);
    boardsRef.remove();
  };

  addNewBoard = name => {
    if (!name) return;
    var keyForName = name.replace(/ /g, "_").toLowerCase();
    var currentNames = Object.keys(this.props.boards);
    if (currentNames.indexOf(keyForName) < 0) {
      var boardsRef = firebase.database().ref(this.getBoardsRef() + keyForName);

      boardsRef.set({ label: name }).then(
        () => {
          this.closeNewBoard();
          this.props.dispatch({ type: "CHANGED_BOARD", board: keyForName });
        },
        error => {
          console.log("error adding board");
          console.error(error);
        }
      );
    } else {
      this.closeNewBoard();
      this.props.dispatch({ type: "CHANGED_BOARD", board: keyForName });
    }
  };

  hasUserSeenImages = boardName => {
    var userLastSeenBoard =
      (this.props.lastSeen && this.props.lastSeen.boards[boardName]) || 0;
    var boardLatestImageTime = Math.max(
      (this.props.boards[boardName].images &&
        Math.max.apply(
          null,
          Object.keys(this.props.boards[boardName].images).map(
            imageKey => this.props.boards[boardName].images[imageKey].timestamp
          )
        )) ||
        0
    );
    return userLastSeenBoard > boardLatestImageTime;
  };

  handleChangeBoard = (event, value) => {
    if (value === "_new_") {
      this.openNewBoard();
    } else {
      this.props.dispatch({ type: "CHANGED_BOARD", board: value });
    }
  };

  openNewBoard = () => {
    this.setState({ newBoardOpen: true });
  };

  closeNewBoard = () => {
    this.setState({ newBoardOpen: false });
  };

  getBoardsRef = () => {
    const designer = this.props.designer;
    const client = this.props.client;

    return "/designers/" + designer + "/clients/" + client + "/boards/";
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    user_loaded: state.user_loaded,
    board: state.board,
    lastSeen: state.lastSeen,
    boards: state.boards
  };
};

export default connect(mapStateToProps)(BoardsMenu);
