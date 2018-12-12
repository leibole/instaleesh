import React from "react";
import IconMenu from "material-ui/IconMenu";
// import Delete from "material-ui/svg-icons/action/delete";
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
          {Object.keys(this.state.boards).map(boardName => {
            return (
              this.state.boards[boardName].label && (
                <MenuItem
                  key={boardName}
                  value={boardName}
                  primaryText={this.state.boards[boardName].label}
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

  componentDidMount() {
    if (this.props.designer) {
      var boardsRef = firebase.database().ref(this.getBoardsRef());

      boardsRef.on("value", snapshot => {
        this.setState({ boards: snapshot.val() || [] });
      });
      this.setState({ boardsRef });
    }
  }

  removeBoard = boardName => {
    var boardsRef = firebase.database().ref(this.getBoardsRef() + boardName);
    boardsRef.remove();
  };

  addNewBoard = name => {
    if (!name) return;
    var keyForName = name.replace(/ /g, "_");
    var currentNames = Object.keys(this.state.boards);
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
    board: state.board
  };
};

export default connect(mapStateToProps)(BoardsMenu);
