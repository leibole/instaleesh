import React, { Component } from 'react';
import { Divider, AppBar, Chip, FloatingActionButton } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { Image } from 'cloudinary-react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import cloudinary from 'cloudinary-core';
import axios from 'axios';
import PhotoGallery from './PhotoGallery';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const uploadButtonStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  zIndex: 1
};

const ccc = window.cloudinary;

class GalleryLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      images: [],
      singleView: false
    };
  }

  render() {
    return (
      <div>
        <AppBar 
          zDepth={4}
          iconElementLeft={<IconButton onClick={this.backFromSingle.bind(this)}><NavigationClose /></IconButton>}
          style={{ 
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            top: '0px' }} >
          <Image 
            cloudName={'instaleesh'} 
            publicId={'title_logo_zhnnid'} 
            height={100}
            />
        </AppBar>
        <div style={{marginTop: '100px'}}>
          <FloatingActionButton style={uploadButtonStyle} onClick={this.uploadWidget.bind(this)} >
            <ContentAdd />
          </FloatingActionButton>
          <Chip
            style={styles.chip}
          >
            Text Chip
          </Chip>
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
      .then(response => this.setState({ images: response.data.resources }));
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