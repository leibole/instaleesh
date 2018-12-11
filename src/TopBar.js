import React, { Component } from "react";
import { AppBar } from "material-ui";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import IconButton from "material-ui/IconButton";
import { Image } from "cloudinary-react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Menu from "material-ui/svg-icons/navigation/menu";
import { connect } from "react-redux";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      singleView: false,
      subject: ""
    };
    this.handleChangeIssue = this.handleChangeIssue.bind(this);
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
              onChange={this.handleChangeIssue}
              value={this.props.board}
            >
              <MenuItem value="home" primaryText="Home" />
              <MenuItem value="kitchen" primaryText="Kitchen" />
              <MenuItem value="plans" primaryText="Plans" />
              <MenuItem value="models" primaryText="3D models" />
              <MenuItem value="livingroom" primaryText="Living Room" />
              <MenuItem value="bedroom" primaryText="Bedroom" />
              <MenuItem value="children" primaryText="Chidren's Room" />
              <MenuItem value="bathroom" primaryText="Bathroom" />
              <MenuItem value="dining" primaryText="Dining" />
              <MenuItem value="office" primaryText="Office" />
              <MenuItem value="inspiration" primaryText="My Inspiration" />
            </IconMenu>
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

  handleChangeIssue = (event, value) => {
    this.props.dispatch({ type: "CHANGED_BOARD", board: value });
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    user_loaded: state.user_loaded,
    board: state.board
  };
};

export default connect(mapStateToProps)(TopBar);
