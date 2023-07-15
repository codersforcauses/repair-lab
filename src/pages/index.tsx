import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative">
      <div className="h-screen w-screen">
        <div className="h-1/3 w-full relative">
          <Image
            src="/images/landing.jpg"
            alt="Greyscale picture of water animal"
            // width={200}
            // height={400}
            fill={true}
            className="object-cover object-center"
          />
        </div>
        <div className="flex justify-center -translate-y-1/2 transform w-full">
          <Image
            src="/images/repair_lab_logo.png"
            alt="Greyscale picture of water animal"
            width={500}
            height={500}
            className="h-28 w-28"
          />
        </div>
        <div className="flex justify-center pr-10 pl-10">
            <div className="mb-1 text-center text-xl font-bold pt-28">About Us</div>
            <div className="">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </div>
        </div>
      </div>
      <div>
        page 2
      </div>
    </div>
  );
}
