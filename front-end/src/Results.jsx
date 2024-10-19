import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import skibidiImage from './assets/skibidi.jpg'; // Adjust the path as needed

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const uploadedImage = location.state?.uploadedImage || skibidiImage;

  const handleBackToUpload = () => {
    navigate('/'); // Navigate back to ImageUpload page
  };

  return (
    <div className="flex flex-col">
      <header className="bg-gray-100 p-10 text-center border-b border-gray-300">
        <h1 className="m-0 text-5xl text-gray-800">Results</h1>
      </header>
      <div className="flex justify-around items-center h-[80vh] bg-gray-200">
        <div className="flex flex-col items-center justify-center bg-gray-800 text-white rounded-2xl overflow-hidden w-[40%] h-[80%]">
          <img
            src={uploadedImage} // Use the uploaded image or the default
            alt="Uploaded or Skibidi"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-between bg-blue-400 text-gray-800 rounded-2xl p-8 w-[40%] h-[80%] shadow-md">
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm mb-2">
            <h3 className="text-lg font-bold">Top Section</h3>
            <p>Content for the top section.</p>
          </div>
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm mb-2">
            <h3 className="text-lg font-bold">Middle Section</h3>
            <p>Content for the middle section.</p>
          </div>
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Bottom Section</h3>
            <p>Content for the bottom section.</p>
          </div>
        </div>
      </div>
      <div className="h-[60vh] bg-green-600 text-white rounded-2xl p-8 mx-auto w-[90%] mt-5 shadow-md">
        <h2 className="text-lg font-bold">Bottom Rectangle</h2>
        <p>Content for the bottom side.</p>
      </div>
      <button
        className="w-[90%] mx-auto my-5 px-5 py-3 text-lg text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
        onClick={handleBackToUpload}
      >
        Back to Upload
      </button>
    </div>
  );
};

export default Results;
