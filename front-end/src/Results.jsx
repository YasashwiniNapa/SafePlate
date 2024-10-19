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
    <div>
      <header style={styles.header}>
        <h1 style={styles.title}>Results</h1>
      </header>
      <div style={styles.container}>
        <div style={styles.leftRectangle}>
          <img
            src={uploadedImage} // Use the uploaded image or the default
            alt="Uploaded or Skibidi"
            style={styles.image}
          />
        </div>
        <div style={styles.rightRectangle}>
          <div style={styles.section}>
            <h3>Top Section</h3>
            <p>Content for the top section.</p>
          </div>
          <div style={styles.section}>
            <h3>Middle Section</h3>
            <p>Content for the middle section.</p>
          </div>
          <div style={styles.section}>
            <h3>Bottom Section</h3>
            <p>Content for the bottom section.</p>
          </div>
        </div>
      </div>
      <div style={styles.bottomRectangle}>
        <h2>Bottom Rectangle</h2>
        <p>Content for the bottom side.</p>
      </div>
      <button style={styles.backButton} onClick={handleBackToUpload}>
          Back to Upload
      </button>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: '#f5f5f5',
    padding: '2.5vh',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
  title: {
    margin: 0,
    fontSize: '4vw',
    color: '#333',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '80vh',
    backgroundColor: '#f0f0f0',
  },
  leftRectangle: {
    flex: '1',
    maxWidth: '40%',
    height: '80%',
    backgroundColor: '#282c34',
    borderRadius: '25px',
    overflow: 'hidden', // Hide overflow if image is too large
    display: 'flex', // Center the image
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
  },
  image: {
    width: '100%', // Responsive width
    height: '100%', // Set height to 100% of the container
    objectFit: 'contain', // Maintain aspect ratio and fit within the container
  },
  rightRectangle: {
    flex: '1',
    maxWidth: '40%',
    height: '80%',
    backgroundColor: '#61dafb',
    color: '#282c34',
    borderRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '0 1.5%',
    minWidth: '200px',
  },
  section: {
    flex: '1',
    padding: '1vh',
    borderRadius: '15px',
    margin: '0 0 10px 0',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  bottomRectangle: {
    height: '60vh',
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: '20px',
    padding: '2vh',
    margin: '20px auto',
    maxWidth: '90%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  backButton: {
    width: '90%',
    margin: '5%',
    marginTop: '4%',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Results;
