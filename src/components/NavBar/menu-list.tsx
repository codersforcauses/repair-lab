import Link from "next/link";

interface Props {
  items: Array<string>;
}

export default function MenuList({ items }: Props) {
  return (
    <div>
      {items.map((item) => (
        <Link href="/" key={item}>
          {item}
        </Link>
      ))}
    </div>
  );
}
