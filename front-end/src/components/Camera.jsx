import React, { useRef, useState } from "react"; // Importing React and hooks
import Webcam from "react-webcam"; // Importing the webcam component from react-webcam
import '../styles/camera.css';

function CameraCapture() {
  const webcamRef = useRef(null); // Creating a ref to access the webcam component
  const [image, setImage] = useState(null); // State to hold the captured image
  const [isTakingPhoto, setIsTakingPhoto] = useState(false); // State to track if a photo is being taken

  // Function to capture a photo
  const capturePhoto = () => {
    setIsTakingPhoto(true); // Set taking photo state
    const screenshot = webcamRef.current.getScreenshot(); // Capture the screenshot from the webcam
    if (screenshot) {
      const img = new Image();
      img.src = screenshot;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas size to the screenshot size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image mirrored
        context.translate(img.width, 0); // Move the context to the right side
        context.scale(-1, 1); // Flip horizontally
        context.drawImage(img, 0, 0); // Draw the image on the canvas

        // Get the flipped image data
        const flippedImage = canvas.toDataURL('image/jpeg');
        setImage(flippedImage); // Set the captured screenshot to the state
        setIsTakingPhoto(false); // Reset taking photo state
      };
    }
  };

  // Function to retake the photo
  const retakePhoto = () => {
    setImage(null); // Clear the captured image
  };

  // Function to handle submission of the photo
  const handleSubmit = () => {
    if (image) {
      // Here, you can handle the submission of the image
      alert("Image submitted!"); // Placeholder for submission logic
      retakePhoto(); // Reset to the live stream after submission
    }
  };

  return (
    <div className="camera-capture flex flex-col items-center justify-center h-screen"> {/* Centering items */}
      <div className="webcam-border relative"> {/* Green border around the camera component */}
        {/* Live webcam feed */}
        <Webcam
          audio={false} // Disable audio capture
          ref={webcamRef} // Assign the ref to the Webcam component
          screenshotFormat="image/jpeg" // Specify the format of the captured image
          width={500} // Set the width of the webcam feed
          className="transition-opacity duration-500" // Fade-in effect for the webcam feed
          style={{ transform: 'scaleX(-1)' }}
          playsInLine
       />

        {/* Conditional rendering to show the captured image on top of the webcam feed */}
        {image && (
          <img
            src={image}
            alt="Captured"
            className={`webcam-image absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${isTakingPhoto ? 'opacity-0' : 'opacity-100'}`} // Full-screen overlay for captured image
            onLoad={() => setIsTakingPhoto(false)} // Reset the state once the image has loaded
          />
        )}
      </div>

      {/* Conditional rendering for buttons based on whether an image is captured */}
      {image ? (
        <div className="mt-4 space-x-10">
          <button 
            onClick={retakePhoto} 
            className="mt-4 bg-[#FC7100] justify-center hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full shadow-md transition-shadow duration-200 l-60"
          >
            Retake Photo
          </button>
          <button 
            onClick={handleSubmit} 
            className="mt-4 bg-[#5CA135] justify-center hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full shadow-md transition-shadow duration-200 l-60"
          >
            Submit Photo
          </button>
        </div>
      ) : (
        <button 
          onClick={capturePhoto} 
          className="mt-8 bg-[#5CA135] justify-center hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full shadow-md transition-shadow duration-200 l-60" // Button styles
        >
          Take Photo
        </button>
      )}
    </div>
  );
}

export default CameraCapture; // Export the component for use in other parts of the app

