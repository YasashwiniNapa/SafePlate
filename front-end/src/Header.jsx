import React from "react";
import { HomeIcon } from "@heroicons/react/solid"; // Import the Home icon

const Header = () => {
  return (
    <header className="bg-gray-800 text-white flex items-center p-4 shadow-md">
      <div className="flex items-center">
        <HomeIcon className="h-6 w-6 mr-2 text-white" /> {/* Home icon */}
        <h1 className="text-xl font-bold">Home</h1>
      </div>
    </header>
  );
};

export default Header;