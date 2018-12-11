import React, { Component } from "react";
import Masonry from "react-masonry-component";
import SinglePhoto from "./SinglePhoto";

const masonryOptions = {
  transitionDuration: 0
};

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: null };
    this.renderPhotos = this.renderPhotos.bind(this);
  }

  render() {
    return (
      <div>
        <Masonry
          className={"my-gallery-class"}
          elementType={"div"}
          enableResizableChildren={true}
          options={masonryOptions}
          onLayoutComplete={this.scrollToCurrentImage.bind(this)}
          disableImagesLoaded={false}
          updateOnEachImageLoad={true}
        >
          {this.renderPhotos(
            this.props.images,
            this.props.singleView,
            this.imageClicked.bind(this)
          )}
        </Masonry>
      </div>
    );
  }

  //Has to be called here b/c current image needs to be referenced by masonary callback
  imageClicked(element) {
    this.props.onImageClick();
    this.setState({ currentImage: element });
  }

  scrollToCurrentImage() {
    if (this.state.currentImage) {
      this.state.currentImage.scrollIntoView();
      this.setState({ currentImage: null });
    }
  }

  renderPhotos(images, singleView, onImageClick) {
    var imagesToRender = Object.keys(images).map(imageKey => {
      var image = images[imageKey];
      image.id = imageKey;
      return image;
    });
    return imagesToRender.map(
      image => (
        <SinglePhoto
          image={image}
          key={image.public_id}
          singleView={singleView}
          onImageClick={onImageClick}
          user={this.props.user}
        />
      ),
      this
    );
  }
}

export default PhotoGallery;
