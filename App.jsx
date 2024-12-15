// App Component //
import React, { useState } from 'react';
import BreedSelector from './BreedSelector';
import ImageGallery from './ImageGallery';
import './App.css';
import Loader from './Loader';

// App Function //
function App() {
  const [selectedBreed, setSelectedBreed] = useState(''); //String//
  const [numberOfImages, setNumberOfImages] = useState(0); //Number//
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); //Set to false until startLoading begins//

  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
  };

  const handleNumberChange = (number) => {
    setNumberOfImages(number);
  };

  const handleFetchImages = (fetchedImages) => {
    setImages(fetchedImages);
    setLoading(false)
  };

  const startLoading = () => {
    setLoading(true)
  }

// Returns expected dog breed and number of images selected and triggers the loading state to display the loading icon //
  return (
    <div className="App">
      <h1>Dog Image Gallery</h1>
      <BreedSelector 
        onBreedChange={handleBreedChange} 
        onNumberChange={handleNumberChange} 
        selectedBreed={selectedBreed} 
        numberOfImages={numberOfImages} 
        onFetchImages={handleFetchImages}
        startLoading={startLoading}
      />
      {loading ? <Loader /> : <ImageGallery images={images} />} {/* Renders the Loader ans then renders ImageGallery */}
    </div>
  );
}

export default App;