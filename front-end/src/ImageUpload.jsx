import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Navigate to the Results page with the uploaded image
        navigate('/results', { state: { uploadedImage: image } });
    };

    return (
        <div>
            <header style={styles.header}>
                <h1 style={styles.title}>[team name]</h1>
            </header>
            <div style={styles.container}>
                <h1>Upload an Image</h1>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button type="submit" disabled={!image}>Submit</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    header: {
        backgroundColor: '#f5f5f5',
        padding: '2.5vh',
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
        height: '20vh',
    },
    title: {
        margin: 0,
        fontSize: '4vw',
        color: '#333',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
    },
};

export default ImageUpload;
