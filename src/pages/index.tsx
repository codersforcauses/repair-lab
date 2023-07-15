import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative">
      <div className="h-screen w-screen bg-blue-100">
        <div className="relative h-1/3 w-full">
          <Image
            src="/images/landing.jpg"
            alt="Greyscale picture of water animal"
            // width={200}
            // height={400}
            fill={true}
            className="object-cover object-center"
          />
        </div>
        <div className="flex w-full -translate-y-1/2 transform justify-center">
          <Image
            src="/images/repair_lab_logo.png"
            alt="Greyscale picture of water animal"
            width={500}
            height={500}
            className="h-28 w-28"
          />
        </div>
        <div className=" -translate-y-12">
          <div className="mb-2 text-center text-3xl font-bold mt-5">About Us</div>
          <div className="pl-10 pr-10 pt-10 text-sm text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
      <div>page 2</div>
      <div className="w-screen h-9">page 3</div>
    </div>
  );
}
