import Link from "next/link";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";

import { NavPath } from "@/types";

interface Props {
  items: Array<NavPath>;
}

export default function MenuList({ items }: Readonly<Props>) {
  const router = useRouter();

  return (
    <Tab.Group>
      <Tab.List className="flex pl-1">
        {items.map((item) => (
          <Tab
            key={item.item}
            className={`px-16 py-4 rounded-lg font-medium outline-none text-black hover:text-primary-700 ${
              router.asPath === item.path ? " text-primary-700" : ""
            }`}
          >
            <Link href={item.path}>
              <div className="flex items-center justify-center h-full w-full">
                {item.item}
              </div>
            </Link>
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
