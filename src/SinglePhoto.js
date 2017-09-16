import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Image, Transformation } from 'cloudinary-react';
import reactDOM from 'react-dom';
import Comments from './Comments';

class SinglePhoto extends Component {
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
          <CardTitle>
            <Comments imageId={this.props.image.public_id} />
          </CardTitle>
        </Card>
        <br />
      </Col>
    );
  }

  imageClicked() {
    var imageDOMElement = reactDOM.findDOMNode(this.cardRef);
    this.props.onImageClick(imageDOMElement);
  }
};

export default SinglePhoto;