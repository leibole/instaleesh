import React, { Component } from "react";
import { AppBar } from "material-ui";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import IconButton from "material-ui/IconButton";
import { Image } from "cloudinary-react";
import { connect } from "react-redux";
import BoardsMenu from "./Boards/BoardsMenu";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      boards: {},
      singleView: false,
      subject: ""
    };
  }

  render() {
    return (
      <AppBar
        zDepth={4}
        iconStyleLeft={{ margin: "auto" }}
        iconElementLeft={
          <div>
            <IconButton
              onClick={this.props.backCallback}
              style={{
                width: 70,
                height: 70,
                color: "black",
                display: this.props.singleView ? "" : "none"
              }}
              iconStyle={{ width: 70, height: 70, padding: 14, color: "black" }}
            >
              <NavigationArrowBack />
            </IconButton>
            <BoardsMenu
              client={this.props.client}
              designer={this.props.designer}
            />
          </div>
        }
        style={{
          backgroundColor: "#FFFFFF",
          primaryText: "black"
        }}
      >
        <Image
          cloudName={"instaleesh"}
          publicId={"title_logo_mchxjq"}
          height={100}
        />
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    user_loaded: state.user_loaded,
    board: state.board
  };
};

export default connect(mapStateToProps)(TopBar);
