import { NavPath } from "@/types";
import Link from "next/link";

interface Props {
  items: Array<NavPath>;
}

export default function MenuList({ items }: Props) {
  return (
    <div>
      {items.map((item) => (
        <Link href={item.path}>{item.item}</Link>
      ))}
    </div>
  );
}
