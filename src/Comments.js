import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import firebase from './firebase';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ReactTooltip from 'react-tooltip';
import { CardText } from 'material-ui/Card';
import Linkify from 'react-linkify';

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  render() {
    return (
      <Row>
        <form onSubmit={this.submitComment.bind(this)} >
          <Col xs={9}>
            <TextField
              hintText="Comment on this image"
              multiLine={true}
              rowsMax={3}
              value={this.state.comment}
              onChange={this.handleChange.bind(this)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={3}>
            <IconButton
              type="submit"
              tooltip="Comment"
              touch={true}
              tooltipPosition="bottom-right"
              disabled={this.state.comment === ''} >
              <ContentSend style={{ zIndex: 0 }} />
            </IconButton>
          </Col>
        </form>
      </Row>
    )
  }

  handleChange(event) {
    this.setState({ comment: event.target.value })
  }

  submitComment(event) {
    event.preventDefault();
    let userData = this.props.user.providerData[0];
    const commentsRef = firebase.database().ref('comments');
    commentsRef.push({
      comment: this.state.comment,
      imageId: this.props.imageId,
      userData: userData
    })
    this.setState({ comment: '' })
  }
}

class SinglePhotoComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoComments: []
    };
  }
  
  render() {
    return (
      <CardText style={{ paddingTop: '0px' }}>
      {this.state.photoComments.map(comment => (
        <Paper key={comment.id} style={{ margin: '5px', padding: '5px', overflowWrap: 'break-word' }} zDepth={5} >
          <Avatar
            data-tip={comment.userData ? comment.userData.displayName : ''}
            src={comment.userData ? comment.userData.photoURL : ''}
            size={25}
            style={{ margin: '5px' }}
          />
          <ReactTooltip data-effect="float" />
          <Linkify>
            {comment.content}
          </Linkify>
        </Paper>
      ))}
    </CardText>
    )
  }

  componentDidMount() {
    this.loadComments.call(this);
  }

  loadComments() {
    const commentsRef = firebase.database().ref('comments');
    commentsRef
      .orderByChild("imageId")
      .equalTo(this.props.imageId)
      .on('child_added', (function (snapshot) {
        let newComments = this.state.photoComments;
        newComments.push({
          id: snapshot.key,
          content: snapshot.child('comment').val(),
          userData: snapshot.child('userData').val()
        });
        this.setState({ photoComments: newComments });
        this.props.imageAddCallback(newComments.length);
      }).bind(this));
  }
}


export { SinglePhotoComments, CommentInput };