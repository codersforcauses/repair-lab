import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxImage, RxPerson } from "react-icons/rx";
import { SlFolderAlt } from "react-icons/sl";

interface Props {
  children?: ReactNode;
}

const Sidebar = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="fixed flex h-screen w-80 flex-col border-r-[1px] bg-white p-4">
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
          <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
          <Link
            href="#"
            className="p-1 text-center text-lg font-bold text-gray-600"
          >
            Back to Dashboard
          </Link>
          <Link href="#">
            <div className="my-4 inline-flex cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
              <SlFolderAlt size={30} />
              <p className="px-4 text-lg">Repair requests</p>
            </div>
          </Link>
          <Link href="/volunteers">
            <div className="my-4 inline-flex cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
              <RxPerson size={30} />
              <p className="px-4 text-lg">Volunteers</p>
            </div>
          </Link>
          <Link href="/">
            <div className="my-4 inline-flex cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
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
