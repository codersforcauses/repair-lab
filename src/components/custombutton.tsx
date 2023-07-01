import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-teal-500 text-white py-2 px-400 rounded font-bold cursor-pointer w-full"
    >
      {text}
    </button>
  );
};

export default CustomButton;
