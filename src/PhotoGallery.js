import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import SinglePhoto from './SinglePhoto';
import firebase from './firebase';

const masonryOptions = {
  transitionDuration: 0
};

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: null }
  }

  render() {
    return (
      <div>
        <Masonry
          className={'my-gallery-class'}
          elementType={'div'}
          enableResizableChildren={true}
          options={masonryOptions}
          onLayoutComplete={this.scrollToCurrentImage.bind(this)}
          disableImagesLoaded={false}
          updateOnEachImageLoad={true}
        >
          {renderPhotos(this.props.images, this.props.singleView, this.imageClicked.bind(this))}
        </Masonry>
      </div>
    )
  }

  componentDidMount() {
    const imagesRef = firebase.database().ref('images');
    this.props.images.map(image => {
      return imagesRef.push({ externalId: image.public_id });
    });
  }
  //Has to be called here b/c current image needs to be referenced by masonary callback
  imageClicked(element) {
    this.props.onImageClick();
    this.setState({ currentImage: element })
  }

  scrollToCurrentImage() {
    // if (this.state.currentImage)
    //   this.state.currentImage.scrollIntoView();
  }
}

function renderPhotos(images, singleView, onImageClick) {
  return images.map(image => (
    <SinglePhoto
      image={image}
      key={image.public_id}
      singleView={singleView}
      onImageClick={onImageClick} />
  ));
}


export default PhotoGallery;