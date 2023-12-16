import Link from "next/link";
import { Tab } from "@headlessui/react";

import { NavPath } from "@/types";

interface Props {
  items: Array<NavPath>;
}

// function classNames(...classes: any[]) {
// return classes.filter(Boolean).join(" ");
// }

export default function MenuList({ items }: Props) {
  return (
    <Tab.Group>
      <Tab.List className="flex pl-1">
        {items.map((item) => (
          <Tab
            key={item.item}
            className="w-[160px] h-[60px] rounded-lg font-medium outline-none text-black hover:bg-slate-100 hover:text-primary-700"
          >
            <Link href={item.path}>{item.item}</Link>
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
