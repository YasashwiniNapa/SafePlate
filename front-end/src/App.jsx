import React from 'react';
import ImageUpload from './components/ImageUpload'; // Adjust the path as necessary
import Results from './components/Results'; // Adjust the path as necessary
import Profile from './components/Profile'; // Adjust the path as necessary
import './index.css'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5CA135] to-[#196E63] bg-cover bg-fixed">
      <main>
        <Profile />
        <ImageUpload/>
        <Results />
      </main>
    </div>
  );
};

export default App;
