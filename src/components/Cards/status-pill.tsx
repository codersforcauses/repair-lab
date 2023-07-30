type Props = {
  status?: string;
};

export default function StatusPill({ status }: Props) {
  let bgColor;
  switch (status) {
    case "ACCEPTED":
      bgColor = "bg-darkAqua-400";
      break;
    case "PENDING":
      bgColor = "bg-yellow-500";
      break;
    case "CANCELLED":
      bgColor = "bg-red-500";
  }

  return (
    <button
      className={`${bgColor} right-0 rounded-full px-2 text-sm font-semibold text-white`}
    >
      {status}
    </button>
  );
}
