import React from "react";

const CustomButton = ({ children, onClick }) => {
  return (
    <button
      className="bg-color-098D85 hover:bg-color-1E807E text-white py-2 px-4 rounded-md font-bold cursor-pointer transition duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
