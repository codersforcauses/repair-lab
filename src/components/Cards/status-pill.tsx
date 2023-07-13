type Props = {
  status?: string;
};

export default function StatusPill({ status }: Props) {
  return (
    <button className="right-0 rounded-full bg-red-500 px-2 text-xs text-white">
      Press Me
    </button>
  );
}
