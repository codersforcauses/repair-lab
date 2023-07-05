import React from "react";

interface CustomButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, text }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full cursor-pointer rounded-md bg-[#098D85] py-2 font-bold text-white"
    >
      {text}
    </button>
  );
};

export default CustomButton;
