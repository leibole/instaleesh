import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { Image, Transformation } from 'cloudinary-react';
import reactDOM from 'react-dom';

class SinglePhoto extends Component {
    constructor(props) {
        super(props);
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
                style={{ height: '100%', cursor: 'pointer' }}
                ref={(cardRef)=>{this.cardRef = cardRef}}>
                <CardMedia>
                    <Image
                    cloudName="instaleesh"
                    publicId={this.props.image.public_id}
                    onClick={this.imageClicked.bind(this)}
                    >
                    <Transformation quality="60" />
                    </Image>
                </CardMedia>
                <CardTitle subtitle="Some more information here" />
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