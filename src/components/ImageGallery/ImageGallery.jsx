import PropTypes from 'prop-types';
import { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, onImageClick }) {
  const [key] = useState(0);

  return (
    <ul className="ImageGallery">
      {images.map((image, index) => (
        <li key={key + index} className="ImagegalleryItem">
          <ImageGalleryItem
            webformatURL={image.webformatURL}
            alt={image.tags}
            largeImageURL={image.largeImageURL}
            id={image.id}
            onImageClick={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
