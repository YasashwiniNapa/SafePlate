import React, { useState } from 'react';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    //const navigate = useNavigate();

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

    const handleTakePhoto = (event) => {
        event.preventDefault();
        // Navigate to the Results page with the uploaded image
        navigate('/camera');
    };

    const handleBackToProfile = (event) => {
        event.preventDefault();
        // Navigate to the Results page with the uploaded image
        navigate('/');
    };

    return (
        <div className="flex flex-col h-screen">
    <header className="bg-[#5CA135] text-center p-5 flex justify-center h-1/10 space-x-5"></header>
            <div className="flex flex-col items-center justify-center h-4/5">
                <h1 className="text-3xl mb-10">Upload an Image</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="mb-4 border bg-white border-gray-300 rounded p-2"
                    />
                    <button 
                        type="submit" 
                        disabled={!image}
                        className="mt-4 bg-[#5CA135] justify-center hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full shadow-md transition-shadow duration-200 l-60"
                    >
                        Submit
                    </button>
                    
                </form>
                <text className="text-10 mt-2">or</text>
                <form onSubmit={handleTakePhoto} className="flex flex-col items-center">
                    <button 
                        type="submit" 
                        className="mt-4 bg-[#FC7100] hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-shadow duration-200"
                    >
                        Or Take a Photo
                    </button>
                </form>
            </div>
            <header className="bg-[#5CA135] text-center p-5 flex justify-center h-1/10 space-x-5"></header>
        </div>
    );
};

export default ImageUpload;
