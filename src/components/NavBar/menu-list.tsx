import { NavPath } from "@/types";
import { Tab } from "@headlessui/react";
import Link from "next/link";

interface Props {
  items: Array<NavPath>;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuList({ items }: Props) {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-row pl-20 space-x-1">
        {items.map((item) => (
          <Tab
            key={item.item}
            className="w-[200px] h-[60px] rounded-lg font-medium outline-none text-black hover:bg-slate-100 hover:text-primary-700"
          >
            {<Link href={item.path}>{item.item}</Link>}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
