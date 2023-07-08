type Props = {
  color?: string;
  border?: string;
  children?: React.ReactNode;
  height?: string;
  onClick?: () => void;
  radius?: string;
  width?: string;
  textColor?: string;
  position?: string;
};

const Button = ({
  color = "bg-primary-600",
  border = "border-1",
  children,
  height = "h-12",
  onClick,
  radius = "rounded-lg",
  width = "w-full",
  textColor = "text-white",
  position = "mx-auto"
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${color} ${border} ${radius} ${height} ${width} ${textColor} ${position}`}
    >
      {children}
    </button>
  );
};

export default Button;
