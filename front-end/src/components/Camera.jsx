import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import '../styles/camera.css';
import axios from 'axios';

function CameraCapture() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [ingredients, setIngredients] = useState('');

  // Log the updated ingredients whenever it changes
  useEffect(() => {
    console.log("Updated ingredients state:", ingredients);
  }, [ingredients]);

  // Function to convert base64 to Blob
  const base64ToBlob = (base64, type = 'image/jpeg') => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteNumbers], { type });
  };

  // Function to capture a photo
  const capturePhoto = () => {
    setIsTakingPhoto(true);
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      const img = new Image();
      img.src = screenshot;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas size to the screenshot size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image without flipping
        context.drawImage(img, 0, 0);

        const capturedImage = canvas.toDataURL('image/jpeg');
        setImage(capturedImage);
        setIsTakingPhoto(false);
      };
    }
  };

  // Function to retake the photo
  const retakePhoto = () => {
    setImage(null);
    setIngredients(''); // Clear ingredients when retaking photo
  };

  // Function to handle submission of the photo
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
            console.log("Extracted text:", response.data);
            
            // Directly set the extracted text as ingredients
            setIngredients(response.data || "No ingredients found.");
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
          className="transition-opacity duration-500"
          style={{ transform: 'scaleX(1)' }}
          playsInline
        />

        {image && (
          <img
            src={image}
            alt="Captured"
            className={`webcam-image absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${isTakingPhoto ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsTakingPhoto(false)}
          />
        )}
      </div>

      {image ? (
        <div className="mt-4">
          <button
            onClick={retakePhoto}
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retake Photo
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Photo
          </button>
        </div>
      ) : (
        <button
          onClick={capturePhoto}
          className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-green-600 hover:text-white"
        >
          Take Photo
        </button>
      )}

      {/* Display extracted ingredients */}
      {ingredients && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="font-bold">Extracted Ingredients:</h3>
          <p>{ingredients}</p>
        </div>
      )}
    </div>
  );
}

export default CameraCapture;
