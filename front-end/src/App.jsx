import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Camera from './components/Camera';
import ImageUpload from './components/ImageUpload'; // Adjust the path as necessary
import Results from './components/Results'; // Adjust the path as necessary
import Profile from './components/Profile'; // Adjust the path as necessary

const App = () => {
  return (
    <div>
      <main>
        <Profile />
        <ImageUpload />
        <Camera />
        <Results />
      </main>
    </div>
  );
};

export default App;
