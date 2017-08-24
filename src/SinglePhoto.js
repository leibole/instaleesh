import React from 'react';
import { Col } from 'react-bootstrap';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { Image, Transformation } from 'cloudinary-react';

const SinglePhoto = (props) => {
    let columnSizes = {
        lg: props.singleView ? 6 : 3,
        sm: props.singleView ? 6 : 4,
        xs: props.singleView ? 6 : 6,
        lgOffset: props.singleView ? 3 : 0,
        xsOffset: props.singleView ? 3 : 0,
        smOffset: props.singleView ? 3 : 0
    }
    return (
        <Col lg={columnSizes.lg} lgOffset={columnSizes.lgOffset} sm={columnSizes.sm} xs={columnSizes.xs}>
        <br />
        <Card style={{ height: '100%', cursor: 'pointer' }}>
          <CardMedia>
            <Image
              cloudName="instaleesh"
              publicId={props.image.public_id}
              onClick={props.onImageClick}
            >
              <Transformation quality="60" />
            </Image>
          </CardMedia>
          <CardTitle subtitle="Some more information here" />
        </Card>
        <br />
      </Col>
    );
};

export default SinglePhoto;