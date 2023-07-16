interface PanelProps {
  children?: React.ReactNode;
}

const Panel = ({ children }: PanelProps) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-screen rounded-md bg-white p-8 shadow md:w-3/6 lg:w-4/12">
        {children}
      </div>
    </div>
  );
};

export default Panel;
