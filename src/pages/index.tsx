import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative">
      <div className="h-screen w-screen">
        <div className="h-1/3 w-full">
          <Image
            src="/images/landing.jpg"
            alt="Greyscale picture of water animal"
            width={200}
            height={400}
            className="h-full"
          />
        </div>
        <div className="left-1/2 top-1/4 z-10 w-32 -translate-y-1/2 transform">
          <Image
            src="/images/repair_lab_logo.png"
            alt="Greyscale picture of water animal"
            width={500}
            height={500}
          />
        </div>
        <div className="relative left-1/2 top-1/2 z-10 -translate-x-1/2 transform">
          <div className="flex flex-col pr-10 pl-10">
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
      </div>
      {/* PAGE 2 START */}
      <div>
      </div>
      </div>
    </div>
  );
}
