import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import skibidiImage from '../assets/skibidi.jpg'; // Adjust the path as needed

const Results = () => {
  const uploadedImage = location.state?.uploadedImage || skibidiImage;

  const handleBackToUpload = () => {
    navigate('/upload'); // Navigate back to ImageUpload page
  };

  return (
    <div className="flex flex-col">
       <header className="bg-[#5CA135] text-center p-5 flex justify-center h-1/10 space-x-5 mb-3"></header>
      <header className="bg-gray-100 p-10 text-center">
        <h1 className="m-0 text-5xl text-gray-800">Results</h1>
      </header>
      <div className="flex flex-col bg-gray-100">
      <header className="bg-[#F45F67] text-center p-5 flex text-bold text-white p-5 justify-center h-15 mx-40">Warning: Allergies Found</header>
      </div>
      <div className="flex justify-around items-center h-[80vh] bg-gray-200">
        <div className="flex flex-col items-center justify-center bg-gray-800 text-white overflow-hidden w-[40%] h-[80%]">
          <img
            src={uploadedImage} // Use the uploaded image or the default
            alt="Uploaded or Skibidi"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-between bg-[#FB8818] text-gray-800 p-8 w-[40%] h-[80%] shadow-md">
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm mb-2">
            <h3 className="text-lg font-bold">High Risk Allergies:</h3>
            <p>Peanuts</p>
          </div>
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm mb-2">
            <h3 className="text-lg font-bold">Low Risk Allergies:</h3>
            <p>None</p>
          </div>
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Dietary Restrictions:</h3>
            <p>Vegetarian</p>
          </div>
        </div>
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
