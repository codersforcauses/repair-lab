import { ReactNode } from "react";
import Image from "next/image";

interface PanelHeaderProps {
  title: string;
  children?: ReactNode;
}

const PanelHeader = ({ title, children }: PanelHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Image
          src="/images/repair_lab_logo.jpg"
          alt="logo"
          width={80}
          height={80}
        />
      </div>
      <div className="flex items-center justify-center">
        <h1 className="m-4 text-2xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default PanelHeader;
