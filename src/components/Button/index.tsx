import React from "react";

type Props = {
  color: string;
  border: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
};

const Button: React.FC<Props> = ({
  color,
  border,
  children,
  height,
  onClick,
  radius,
  width
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width
      }}
    >
      {children}
    </button>
  );
};

export default Button;


