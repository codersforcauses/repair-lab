import React from "react"; // not necessary as next imports it already

type Props = {
  color?: string;
  border?: string;
  children?: React.ReactNode;
  height?: string;
  onClick?: () => void;
  radius?: string;
  width?: string;
};

// good to have some default values
const Button: React.FC<Props> = ({
  color = "bg-primary-600",
  border = "border-1",
  children,
  height = "h-12",
  onClick,
  radius = "rounded-lg",
  width = "w-1/2"
}) => {
  return (
    // uses tailwind now
    <button
      onClick={onClick}
      className={`${color} ${border} ${radius} ${height} ${width} text-white`}
      // style={{
      //   backgroundColor: color,
      //   border,
      //   borderRadius: radius,
      //   height,
      //   width
      // }}
    >
      {children}
    </button>
  );
};

export default Button;
