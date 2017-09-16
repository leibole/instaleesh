import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { Image, Transformation } from 'cloudinary-react';
import reactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import firebase from './firebase';

class Comments extends Component {
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
              onChange={this.handleChange.bind(this)}
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
    const commentsRef = firebase.database().ref('comments');
    commentsRef.push({ comment: this.state.comment, imageId: this.props.imageId })
  }
}

export default Comments;