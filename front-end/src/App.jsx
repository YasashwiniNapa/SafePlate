import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload'; // Adjust the path as necessary
import Results from './components/Results'; // Adjust the path as necessary
import Profile from './components/Profile'; // Adjust the path as necessary
import Camera from './components/Camera';

const App = () => {
  const [identifiedAllergies, setIdentifiedAllergies] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5CA135] to-[#196E63] bg-cover bg-fixed">
      <main>
        <Profile />
        <ImageUpload />
        <Camera setIdentifiedAllergies={setIdentifiedAllergies} />
        <Results />
      </main>
    </div>
  );
};

export default App;
