import React from "react";

interface CustomButtonProps {
  onClick: () => void;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, text }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-[#098D85] text-white py-2 rounded-md font-bold cursor-pointer w-full"
    >
      {text}
    </button>
  );
};

export default CustomButton;
