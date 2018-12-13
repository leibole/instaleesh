import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Card, CardMedia, CardTitle, CardHeader } from "material-ui/Card";
import reactDOM from "react-dom";
import { CommentInput, SinglePhotoComments } from "./Comments";
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
import { connect } from "react-redux";
import FileDownload from "material-ui/svg-icons/file/file-download";
import "./SinglePhoto.css";
import DeletePhoto from "./DeletePhoto";

class SinglePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfImages: 0
    };

    this.updateNumberOfImages = this.updateNumberOfImages.bind(this);
  }

  render() {
    return (
      <Col
        lg={this.props.singleView ? 6 : 3}
        lgOffset={this.props.singleView ? 3 : 0}
        xs={this.props.singleView ? 10 : 4}
        xsOffset={this.props.singleView ? 1 : 0}
        className="mobile-padding"
      >
        <Card
          ref={cardRef => {
            this.cardRef = cardRef;
          }}
        >
          <CardHeader
            title={this.props.image.userData.displayName}
            subtitle={new Date().toLocaleDateString()}
            avatar={this.props.image.userData.photoURL}
          >
            {this.props.user.providerData[0].uid ===
              this.props.image.userData.uid && (
              <DeletePhoto imageId={this.props.image.id} />
            )}
          </CardHeader>
          <CardMedia style={{ cursor: this.props.singleView ? "" : "pointer" }}>
            <a
              href={
                "//res.cloudinary.com/instaleesh/image/upload/" +
                this.props.image.public_id
              }
              download
            >
              <FileDownload
                style={{
                  height: "30px",
                  width: "30px",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "black",
                  opacity: 0.5
                }}
              />
            </a>
            <img
              src={
                "//res.cloudinary.com/instaleesh/image/upload/q_60/" +
                this.props.image.public_id +
                ".jpg"
              }
              alt="Great furniture"
              onClick={this.imageClicked.bind(this)}
            />
          </CardMedia>
          <Col xsHidden={!this.props.singleView}>
            <CardTitle>
              <CommentInput
                imageId={this.props.image.public_id}
                user={this.props.user}
              />
            </CardTitle>
            <SinglePhotoComments
              imageId={this.props.image.public_id}
              imageAddCallback={this.updateNumberOfImages}
            />
          </Col>
          <Col xsHidden={this.props.singleView} mdHidden={true} lgHidden={true}>
            <CardTitle style={{ padding: "5px" }}>
              <CommunicationChatBubble
                style={{ height: "20px", width: "20px" }}
              />
              <span style={{ marginLeft: "5px", verticalAlign: "top" }}>
                {this.state.numberOfImages}
              </span>
            </CardTitle>
          </Col>
        </Card>
      </Col>
    );
  }

  updateNumberOfImages(numberOfImages) {
    this.setState({ numberOfImages: numberOfImages });
  }

  imageClicked() {
    var imageDOMElement = reactDOM.findDOMNode(this.cardRef);
    this.props.onImageClick(imageDOMElement);
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    user_loaded: state.user_loaded,
    board: state.board
  };
};

export default connect(mapStateToProps)(SinglePhoto);
