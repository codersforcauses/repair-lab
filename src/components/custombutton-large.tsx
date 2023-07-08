import { HTMLAttributes } from "react";

interface CustomButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const CustomButton = ({ onClick, text }: CustomButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full cursor-pointer rounded-md bg-primary-600 py-2 font-bold text-white"
    >
      {text}
    </button>
  );
};

export default CustomButton;
