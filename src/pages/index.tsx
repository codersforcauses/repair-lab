import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="">
        <div className="absolute inset-x-0 top-0 w-screen">
          <Image 
            src="/images/landing.jpg" 
            alt="Greyscale picture of water animal" 
            width={500}
            height={500}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Image 
            src="/images/repair_lab_logo.png" 
            alt="Greyscale picture of water animal" 
            width={500}
            height={500}
            className="w-screen-1/4"
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 w-screen">
            <div className="p-8">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </div>
        </div>
      </div>
      
    </main>
    
  );
}
