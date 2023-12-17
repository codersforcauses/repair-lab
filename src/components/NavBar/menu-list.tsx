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
            className={`w-[160px] h-[60px] rounded-lg font-medium outline-none text-black hover:bg-slate-100 hover:text-primary-700 ${
              router.asPath === item.path ? "underline text-primary-700" : ""
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
