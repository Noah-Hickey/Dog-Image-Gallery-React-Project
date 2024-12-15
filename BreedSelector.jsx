// Breed Selector Component //
import React, { useState, useEffect } from 'react';
import './BreedSelector.css';

// Breed Selector Function //
function BreedSelector({ onBreedChange, onNumberChange, selectedBreed, numberOfImages, onFetchImages,startLoading }) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all'); // API Call //
        const data = await response.json();
        setBreeds(Object.keys(data.message));
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  //Hnadle Submission Function //
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedBreed && numberOfImages > 0) { //If both are true, then it will fetch the breed and number of images. //
      try {
        startLoading();
        const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${numberOfImages}`);
        const data = await response.json();
        if (data.message.length < numberOfImages) {
          console.warn('Not enough images available for the selected breed.');
        }
        onFetchImages(data.message.slice(0, numberOfImages)); // Used slice here to ensure it gathers images correctly. //
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
  };

  // Label and drop-down menu for breed and number of images //
  return (
    <form onSubmit={handleSubmit} className="breed-selector">
      <label htmlFor="breed">Select Breed:</label>
      <select
        id="breed"
        value={selectedBreed}
        onChange={(e) => onBreedChange(e.target.value)}
      >
        <option value="">Select a breed</option>  
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>

      <label htmlFor="number">Number of Images:</label>
      <input
        type="number"
        id="number"
        value={numberOfImages}
        min="1"
        max="100" // Minimum and Maximum number of images //
        onChange={(e) => onNumberChange(e.target.value)}
      />
        {/* Submission */}
      <button type="submit">Fetch Images</button> 
    </form>
  );
}

export default BreedSelector;