import React from "react";
import Popover from "material-ui/Popover";
import ShortText from "material-ui/svg-icons/editor/short-text";
import Paper from "material-ui/Paper";
import DeletePhoto from "./DeletePhoto";

class PhotoDetails extends React.Component {
  state = { open: false };
  render() {
    return (
      <div style={{ height: "0px" }}>
        <ShortText
          onClick={this.handleClick}
          style={{
            cursor: "pointer",
            color: "black",
            backgroundColor: "white",
            opacity: "0.3",
            position: "relative",
            top: "6px",
            left: "6px",
            zIndex: 1000
          }}
        />
        {this.props.imageId && <DeletePhoto imageId={this.props.imageId} />}
        <Popover
          style={{ padding: "6px" }}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
          onRequestClose={this.handleRequestClose}
        >
          <Paper>
            {this.props.name}
            <br />
            {this.props.date}
          </Paper>
        </Popover>
      </div>
    );
  }

  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
}

export default PhotoDetails;
