import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import '../styles/camera.css';
import axios from 'axios';

const allergies = {
  Dairy: ['Milk', 'Cheese', 'Butter'],
  Nuts: ['Almonds', 'Walnuts', 'Peanuts'],
  Peanut: ['Groundnuts', 'Arachis oil', 'Earthnut oil'],
  Gluten: ['Wheat', 'Barley', 'Rye'],
  Eggs: ['Egg Whites', 'Egg Yolks'],
  Soy: ['Tofu', 'Soy Sauce', 'Edamame'],
  Fish: ['Salmon', 'Tuna', 'Sardines'],
  Shellfish: ['Shrimp', 'Crab', 'Lobster'],
  Sesame: ['Sesame Seeds', 'Tahini'],
  Mustard: ['Mustard Seeds', 'Yellow Mustard'],
  Celery: ['Celery Sticks', 'Celery Salt'],
  Corn: ['Corn Starch', 'Corn Syrup'],
  Peas: ['Green Peas', 'Split Peas'],
  Coconut: ['Coconut Milk', 'Coconut Oil'],
  Potatoes: ['White Potatoes', 'Sweet Potatoes'],
  Garlic: ['Garlic Powder', 'Garlic Salt'],
  Onion: ['Red Onion', 'Green Onion'],
  SpiceMix: ['Cinnamon', 'Nutmeg', 'Paprika'],
  Honey: ['Raw Honey', 'Honeycomb'],
  Pepper: ['Black Pepper', 'Red Pepper'],
  Wheat: ['Bread', 'Pasta'],
  Barley: ['Barley Flour', 'Pearled Barley'],
  Rye: ['Rye Bread', 'Rye Flour'],
  Chickpeas: ['Hummus', 'Chickpea Flour'],
  Quinoa: ['Quinoa Grains', 'Quinoa Flour'],
  Avocado: ['Avocado Oil', 'Guacamole'],
  Tomato: ['Tomato Sauce', 'Tomato Paste'],
  Spinach: ['Spinach Salad', 'Spinach Powder'],
  Broccoli: ['Steamed Broccoli', 'Broccoli Soup'],
  Cauliflower: ['Cauliflower Rice', 'Cauliflower Mash'],
  Cabbage: ['Green Cabbage', 'Red Cabbage'],
  Kale: ['Kale Chips', 'Kale Salad'],
  Lettuce: ['Iceberg Lettuce', 'Romaine Lettuce'],
  Cucumber: ['Sliced Cucumber', 'Cucumber Salad'],
  Carrot: ['Carrot Sticks', 'Carrot Juice'],
  Zucchini: ['Zucchini Noodles', 'Grilled Zucchini'],
  BellPepper: ['Red Bell Pepper', 'Green Bell Pepper'],
  Pumpkin: ['Pumpkin Pie', 'Pumpkin Seeds'],
  Squash: ['Butternut Squash', 'Zucchini Squash'],
  Radish: ['Radish Salad', 'Radish Sticks'],
  Beet: ['Beet Salad', 'Pickled Beets'],
  Blackberry: ['Blackberry Jam', 'Blackberry Pie'],
  Raspberry: ['Raspberry Sauce', 'Raspberry Jam'],
  Strawberry: ['Strawberry Smoothie', 'Strawberry Jam'],
  Blueberry: ['Blueberry Muffins', 'Blueberry Sauce'],
  Grapes: ['Red Grapes', 'Green Grapes'],
  Orange: ['Orange Juice', 'Orange Zest'],
  Lemon: ['Lemon Juice', 'Lemon Zest'],
  Lime: ['Lime Juice', 'Lime Zest'],
  Apple: ['Apple Pie', 'Apple Sauce'],
  Pear: ['Pear Salad', 'Dried Pears'],
  Peach: ['Peach Cobbler', 'Peach Salsa'],
  Pineapple: ['Pineapple Juice', 'Dried Pineapple'],
  Mango: ['Mango Salsa', 'Dried Mango'],
  Banana: ['Banana Bread', 'Banana Chips'],
  Cherry: ['Cherry Pie', 'Cherry Jam'],
  Walnut: ['Walnut Oil', 'Chopped Walnuts'],
  Cashew: ['Cashew Butter', 'Roasted Cashews'],
  Pecan: ['Pecan Pie', 'Chopped Pecans'],
  Hazelnut: ['Hazelnut Spread', 'Chopped Hazelnuts'],
  Macadamia: ['Macadamia Cookies', 'Roasted Macadamia Nuts'],
  Almond: ['Almond Milk', 'Almond Flour'],
  PumpkinSeed: ['Pumpkin Seed Oil', 'Roasted Pumpkin Seeds'],
  SunflowerSeed: ['Sunflower Seed Butter', 'Roasted Sunflower Seeds'],
  Chia: ['Chia Pudding', 'Chia Seeds'],
  Flax: ['Flaxseed Oil', 'Ground Flaxseed'],
  Hemp: ['Hemp Seeds', 'Hemp Milk'],
  SoyMilk: ['Soy Milk', 'Soy Yogurt'],
  Rice: ['Rice Cakes', 'Rice Flour'],
  Cereal: ['Breakfast Cereal', 'Granola'],
  Chocolate: ['Milk Chocolate', 'Dark Chocolate'],
  Coffee: ['Brewed Coffee', 'Instant Coffee'],
  Tea: ['Black Tea', 'Green Tea'],
  Alcohol: ['Beer', 'Wine', 'Spirits'],
  Preservatives: ['Sodium Benzoate', 'Potassium Sorbate'],
};

function Camera({ setIdentifiedAllergies }) {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [identifiedAllergies, setLocalIdentifiedAllergies] = useState([]);

  useEffect(() => {
    console.log("Ingredients updated:", ingredients);
  }, [ingredients]);

  const base64ToBlob = (base64, type = 'image/jpeg') => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteNumbers], { type });
  };

  const capturePhoto = () => {
    setIsTakingPhoto(true);
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      setIsTakingPhoto(false);
    } else {
      setIsTakingPhoto(false); // Handle case where screenshot fails
    }
  };

  const retakePhoto = () => {
    setImage(null);
    setIngredients([]);
    setLocalIdentifiedAllergies([]);
    setIdentifiedAllergies([]); // Clear the prop in the parent
  };

  const identifyAllergies = (extractedIngredients) => {
    const foundAllergies = [];
    const normalizedIngredients = extractedIngredients.map(ingredient => ingredient.toLowerCase());

    Object.entries(allergies).forEach(([key, values]) => {
      values.forEach(value => {
        if (normalizedIngredients.includes(value.toLowerCase())) {
          foundAllergies.push(key);
        }
      });
    });

    console.log("Identified Allergies:", foundAllergies);
    return foundAllergies;
  };

  const handleSubmit = async () => {
    if (image) {
      const blob = base64ToBlob(image);
      const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8090/api/ocr/scan', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert("Image submitted successfully!");
        const extractedIngredients = response.data ? response.data.split(',').map(item => item.trim()) : [];
        console.log("Extracted Ingredients:", extractedIngredients);
        setIngredients(extractedIngredients);

        // Identify allergies
        const allergiesFound = identifyAllergies(extractedIngredients);
        setLocalIdentifiedAllergies(allergiesFound); // Update local state
        setIdentifiedAllergies(allergiesFound); // Update prop in the parent

      } catch (error) {
        console.error("Error submitting image:", error);
        alert("Failed to submit image");
      }
    } else {
      alert("No image to submit");
    }
  };

  return (
    <div className="camera-capture flex flex-col items-center justify-center h-screen">
      <div className="webcam-border relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          playsInline
        />
        {image && (
          <img
            src={image}
            alt="Captured"
            className={`webcam-image absolute top-0 left-0 w-full h-full object-cover ${isTakingPhoto ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsTakingPhoto(false)}
          />
        )}
      </div>

      {image ? (
        <div className="mt-4">
          <button onClick={retakePhoto} className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Retake Photo</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit Photo</button>
        </div>
      ) : (
        <button onClick={capturePhoto} className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-green-600 hover:text-white">Take Photo</button>
      )}

      {ingredients.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="font-bold">Extracted Ingredients:</h3>
          <p>{ingredients.join(', ')}</p>
        </div>
      )}

      {identifiedAllergies.length > 0 && (
        <div className="mt-4 p-4 bg-yellow-100 border rounded">
          <h3 className="font-bold">Identified Allergies:</h3>
          <p>{identifiedAllergies.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Camera;
