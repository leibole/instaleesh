import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Image, Transformation } from 'cloudinary-react';
import reactDOM from 'react-dom';
import Comments from './Comments';
import Paper from 'material-ui/Paper';
import firebase from './firebase';
import Avatar from 'material-ui/Avatar';
import ReactTooltip from 'react-tooltip';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

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
        xsOffset={this.props.singleView ? 1 : 0} >
        <br />
        <Card
          ref={(cardRef) => { this.cardRef = cardRef }}>
          <CardMedia
            style={{ cursor: this.props.singleView ? '' : 'pointer' }} >
            <Image
              cloudName="instaleesh"
              publicId={this.props.image.public_id}
              onClick={this.imageClicked.bind(this)}
            >
              <Transformation quality="60" />
            </Image>
          </CardMedia>
          <Col xsHidden={!this.props.singleView}>
            <CardTitle>
              <Comments imageId={this.props.image.public_id} user={this.props.user} />
            </CardTitle>
            <CardText>
              {this.state.imageComments.map(comment => (
                <Paper key={comment.id} style={{ margin: '5px', padding: '5px' }} zDepth={5} >
                  <Avatar
                    data-tip={comment.userData ? comment.userData.displayName : ''}
                    src={comment.userData ? comment.userData.photoURL : ''}
                    size={25}
                    style={{ margin: '5px' }}
                  />
                  <ReactTooltip data-effect="float" />
                  {comment.content}
                </Paper>
              ))}
            </CardText>
          </Col>
          <Col mdHidden={this.props.singleView} lgHidden={this.props.singleView}>
            <CardTitle>
              {this.state.imageComments.length} <CommunicationChatBubble />
            </CardTitle>
          </Col>
        </Card>
        <br />
      </Col>
    );
  }

  componentDidMount() {
    const commentsRef = firebase.database().ref('comments');
    commentsRef
      .orderByChild("imageId")
      .equalTo(this.props.image.public_id)
      .on('child_added', (function (snapshot) {
        let newComments = this.state.imageComments;
        newComments.push({
          id: snapshot.key,
          content: snapshot.child('comment').val(),
          userData: snapshot.child('userData').val()
        });
        this.setState({ imageComments: newComments });
      }).bind(this));
  }

  imageClicked() {
    var imageDOMElement = reactDOM.findDOMNode(this.cardRef);
    this.props.onImageClick(imageDOMElement);
  }
};

export default SinglePhoto;