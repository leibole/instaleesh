import React, { Component } from 'react';
import { Divider, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import cloudinary from 'cloudinary-core';
import axios from 'axios';
import PhotoGallery from './PhotoGallery';
import TopBar from './TopBar';
import Headroom from 'react-headroom';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';
import ReactTooltip from 'react-tooltip';
import ReactQueryParams from 'react-query-params';

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

class GalleryLayout extends ReactQueryParams {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      singleView: false,
      userImagesTag: this.queryParams.name ? this.queryParams.name : 'test',
      subject: ''
    };
    this.changeSubject = this.changeSubject.bind(this);
    this.backFromSingle = this.backFromSingle.bind(this);
  }

  render() {
    return (
      <div>
        <Headroom>
          <TopBar backCallback={this.backFromSingle} singleView={this.state.singleView} changeSubject={this.changeSubject} />
        </Headroom>
        <div>
          <FloatingActionButton style={uploadButtonStyle} onClick={this.uploadWidget.bind(this)} >
            <ContentAdd />
          </FloatingActionButton>
          <Divider />
          <PhotoGallery
            images={this.state.images}
            singleView={this.state.singleView}
            onImageClick={this.changeToSingleView.bind(this)}
            user={this.props.user} />
        </div>
        <IconButton
          onClick={this.props.logoutCallback}
          style={{ width: 70, height: 70 }}
          iconStyle={{ width: 70, height: 70, padding: 14, color: 'black' }}>
          <ActionExitToApp data-tip="Logout" />
          <ReactTooltip data-effect="float" />
        </IconButton>

      </div>
    )
  }

  componentDidMount() {
    var cl = new cloudinary.Cloudinary({ cloud_name: "instaleesh", secure: true });
    var all_images = cl.imageTag(
      this.state.userImagesTag + this.state.subject + '.json', { type: "list" }
    );
    axios.get(all_images.attributes().src)
      .then(response => {
        this.setState({ images: response.data.resources });
      });
  }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.subject === this.state.subject) return;
      var cl = new cloudinary.Cloudinary({ cloud_name: "instaleesh", secure: true });
      var all_images = cl.imageTag(
        this.state.userImagesTag + this.state.subject + '.json', { type: "list" }
      );
      axios.get(all_images.attributes().src)
        .then(response => {
          this.setState({ images: response.data.resources });
        }, error => {
          this.setState({ images: [] });
        });
    }

  backFromSingle() {
    this.setState({ singleView: false });
  }
  
  changeSubject(newSubject) {
    this.setState({ subject: newSubject });
  }

  changeToSingleView() {
    this.setState({ singleView: true });
  }

  uploadWidget() {
    let _this = this;
    ccc.openUploadWidget({ cloud_name: 'instaleesh', upload_preset: 'ggdwq1ap', tags: [this.state.userImagesTag + this.state.subject] },
      function (error, result) {
        if (!error)
          _this.setState({ images: result.concat(_this.state.images) })
      });
  }
}

export default GalleryLayout;