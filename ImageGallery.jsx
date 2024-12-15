// Image Gallery Component //
import React from 'react';
import './ImageGallery.css';

// Image Gallery Function //
function ImageGallery({ images }) {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image} alt="dog" />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;