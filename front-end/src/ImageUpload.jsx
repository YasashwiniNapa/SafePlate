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
        <div className="flex flex-col h-screen">
            <header className="bg-gray-100 p-10 text-center border-b border-gray-300 h-1/5">
                <h1 className="m-0 text-5xl text-gray-800">[team name]</h1>
            </header>
            <div className="flex flex-col items-center justify-center h-4/5">
                <h1 className="text-3xl mb-4">Upload an Image</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="mb-4 border border-gray-300 rounded p-2"
                    />
                    <button 
                        type="submit" 
                        disabled={!image}
                        className={`px-4 py-2 text-white rounded-md ${image ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ImageUpload;
