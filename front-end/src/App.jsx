import React from 'react';
import Camera from './components/Camera';
import Results from './components/Results';
import Profile from './components/Profile'
import ImageUpload from './components/ImageUpload';

const App = () => {
  return (
    <div>
      <main>
        <Profile/>
        <ImageUpload/>
        <Camera />
        <Results/>
      </main>
    </div>
  );
};

export default App;
