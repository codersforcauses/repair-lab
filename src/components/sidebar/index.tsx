import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxImage, RxListBullet, RxPerson } from "react-icons/rx";
import { SlFolderAlt } from "react-icons/sl";

interface Props {
  children?: ReactNode;
}

const sidebarTabStyle =
  "my-4 inline-flex w-full cursor-pointer rounded-lg bg-gray-100 p-3 transition hover:bg-primary-500 hover:text-white";

const Sidebar = ({ children }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex">
      <div className="w-74 fixed flex h-screen flex-col border-r-[1px] bg-white p-4">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div className="grid-element">
              <Image
                src="/images/repair_lab_logo.jpg"
                width={150}
                height={150}
                alt="repair-labs"
              />
            </div>
          </Link>
        </div>
        <div className="items-left flex flex-col px-4 text-zinc-600">
          <span className="w-full border-b-[1px] border-gray-200 p-3 mb-2"></span>
          <Link href="/events">
            <div className={sidebarTabStyle}>
              <RxListBullet size={30} />
              <p className="px-4 text-lg font-bold"> Return to Events </p>
            </div>
          </Link>
          <Link href={`/events/${id}/repair-requests`}>
            <div className={sidebarTabStyle}>
              <SlFolderAlt size={30} />
              <p className="px-4 text-lg">Repair Requests</p>
            </div>
          </Link>
          <Link href={`/events/${id}/volunteers`}>
            <div className={sidebarTabStyle}>
              <RxPerson size={30} />
              <p className="px-4 text-lg">Volunteers</p>
            </div>
          </Link>
          <Link href={`/events/${id}/public-images`}>
            <div className={sidebarTabStyle}>
              <RxImage size={30} />
              <p className="px-4 text-lg">Images</p>
            </div>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
