import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import SinglePhoto from './SinglePhoto';
import firebase from './firebase';

const masonryOptions = {
  transitionDuration: 4
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
                className={'my-gallery-class'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                onLayoutComplete={this.scrollToCurrentImage.bind(this)}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
            >
          {renderPhotos(this.props.images, this.props.singleView, this.imageClicked.bind(this))}
        </Masonry>
      </div>
    )
  }
//Has to be called here b/c current image needs to be referenced by masonary callback
  imageClicked(element) {
    this.props.onImageClick();
    this.setState({ currentImage: element })
  }

  scrollToCurrentImage() {
    if (this.state.currentImage)
      this.state.currentImage.scrollIntoView();
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