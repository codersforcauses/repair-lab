type Props = {
  status?: string;
};

export default function StatusPill({ status }: Props) {
  let bgColor;
  switch (status) {
    case "good":
      bgColor = "green-500";
      break;
    case "meh":
      bgColor = "yellow-500";
      break;
    case "bad":
      bgColor = "red-500";
  }

  return (
    <button
      className={`bg-${bgColor} right-0 rounded-full px-2 text-xs font-bold text-white`}
    >
      Press Me
    </button>
  );
}
