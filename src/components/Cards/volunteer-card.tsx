import { Inter } from "next/font/google";
import Image from "next/image";

import Circle from "@/components/Cards/circle";

type Props = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

const inter = Inter({ subsets: ["latin"] });

export default function VolunteerCard() {
  const firstName = "John";
  const lastName = "Doe";
  const avatar = "/images/generalToy.jpeg";

  return (
    <div
      className={`${inter.className} relative w-64 rounded-lg bg-app-secondary p-2 hover:cursor-pointer`}
    >
      <div className="flex flex-row gap-2">
        {/* LEFT: Avatar of volunteer */}
        <div className="flex justify-center items-center">
          <Image
            src={avatar || "/images/repair_lab_logo.jpg"}
            className="rounded-md h-[72px] w-[72px] m-auto"
            alt="avatar"
            width={80}
            height={80}
          />
        </div>

        {/* MIDDLE */}
        <div className="flex flex-col gap-y-1">
          {/* Name of volunteer*/}
          <p className="text-base font-semibold">
            {firstName} {lastName ?? ""}
          </p>
          <p className="text-center text-app-base-300 bg-app-accent rounded-lg px-1 text-sm">
            Woodworking
          </p>
          <p className="text-app-base-300 w-fit bg-app-secondary-focus rounded-lg px-1 text-sm">
            Bike Repair
          </p>
        </div>

        {/* RIGHT: #. of assigned tasks */}
        <div className="absolute right-2">
          <Circle numberOfTasks={3} />
        </div>
      </div>
    </div>
  );
}
