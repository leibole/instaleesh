import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import reactDOM from 'react-dom';
import { CommentInput, SinglePhotoComments } from './Comments';
import firebase from './firebase';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import './SinglePhoto.css';

class SinglePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageComments: []
    };
  }

  render() {
    return (
      <Col
        lg={this.props.singleView ? 6 : 3}
        lgOffset={this.props.singleView ? 3 : 0}
        xs={this.props.singleView ? 10 : 4}
        xsOffset={this.props.singleView ? 1 : 0}
        className="mobile-padding" >
        <Card
          ref={(cardRef) => { this.cardRef = cardRef }}>
          <CardMedia
            style={{ cursor: this.props.singleView ? '' : 'pointer' }} >
            <img
              src={"//res.cloudinary.com/instaleesh/image/upload/q_60/" + this.props.image.public_id}
              alt="Great furniture"
              onClick={this.imageClicked.bind(this)}
            >
            </img>
          </CardMedia>
          <Col xsHidden={!this.props.singleView}>
            <CardTitle>
              <CommentInput imageId={this.props.image.public_id} user={this.props.user} />
            </CardTitle>
            <SinglePhotoComments imageId={this.props.image.public_id}/>
          </Col>
          <Col xsHidden={this.props.singleView} mdHidden={true} lgHidden={true} >
            <CardTitle style={{ padding: '5px' }}>
              <CommunicationChatBubble style={{ height: '20px', width: '20px' }} />
              <span style={{ marginLeft: '5px', verticalAlign: 'top' }}>
                {this.state.imageComments.length}
              </span>
            </CardTitle>
          </Col>
        </Card>
      </Col>
    );
  }

  imageClicked() {
    var imageDOMElement = reactDOM.findDOMNode(this.cardRef);
    this.props.onImageClick(imageDOMElement);
  }
};

export default SinglePhoto;