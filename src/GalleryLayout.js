import React, { Component } from 'react';
import { Divider, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import cloudinary from 'cloudinary-core';
import axios from 'axios';
import PhotoGallery from './PhotoGallery';
import TopBar from './TopBar';

const uploadButtonStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  zIndex: 2
};

const ccc = window.cloudinary;

class GalleryLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      singleView: false
    };
    this.backFromSingle = this.backFromSingle.bind(this);
  }

  render() {
    return (
      <div>
        <TopBar backCallback={this.backFromSingle} singleView={this.state.singleView} />
        <div style={{ marginTop: '100px' }}>
          <FloatingActionButton style={uploadButtonStyle} onClick={this.uploadWidget.bind(this)} >
            <ContentAdd />
          </FloatingActionButton>
          <Divider />
          <PhotoGallery
            images={this.state.images}
            singleView={this.state.singleView}
            onImageClick={this.changeToSingleView.bind(this)} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    var cl = new cloudinary.Cloudinary({ cloud_name: "instaleesh", secure: true });
    var all_images = cl.imageTag('test.json', { type: "list" });
    axios.get(all_images.attributes().src)
      .then(response => {
        this.setState({ images: response.data.resources });
      });
  }

  backFromSingle() {
    this.setState({ singleView: false });
  }

  changeToSingleView() {
    this.setState({ singleView: true });
  }

  uploadWidget() {
    let _this = this;
    ccc.openUploadWidget({ cloud_name: 'instaleesh', upload_preset: 'ggdwq1ap', tags: ['test'] },
      function (error, result) {
        if (!error)
          _this.setState({ images: result.concat(_this.state.images) })
      });
  }
}

export default GalleryLayout;