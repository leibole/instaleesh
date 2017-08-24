import React from 'react';
import Masonry from 'react-masonry-component';
import SinglePhoto from './SinglePhoto';

const masonryOptions = {
  transitionDuration: 4 
};

const PhotoGallery = (props) => {
    return (
      <div>
        <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
            >
          {renderPhotos(props.images, props.singleView, props.onImageClick)}
        </Masonry>
      </div>
    )
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