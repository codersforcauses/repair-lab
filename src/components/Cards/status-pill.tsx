type Props = {
  status?: string;
};

export default function StatusPill({ status }: Props) {
  let bgColor;
  switch (status) {
    case "good":
      bgColor = "bg-green-500";
      break;
    case "meh":
      bgColor = "bg-yellow-500";
      break;
    case "bad":
      bgColor = "bg-red-500";
  }

  return (
    <button
      className={`${bgColor} right-0 rounded-full px-2 text-xs font-semibold text-white`}
    >
      Press Me
    </button>
  );
}
