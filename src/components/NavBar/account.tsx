import { NavPath } from "@/types";

interface Props {
  name?: string;
}

export default function Account({ name }: Props) {
  return <span>{name}</span>;
}
