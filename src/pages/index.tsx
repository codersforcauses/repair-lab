import { Inter } from "next/font/google";

import Card from "@/components/Cards/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Hello!</h1>
      <div className="flex flex-row gap-4">
        <Card
          title="Sample title 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dui dui. Sed nunc dolor, dignissim non neque vel, facilisis mollis metus. Donec at quam mauris. Suspendisse nec ultrices arcu, vitae euismod libero. Curabitur dolor tortor, pharetra sit amet nibh eget, feugiat tristique lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed sapien sit amet sapien vestibulum hendrerit in sed est. "
          image="images/penguin.jpg"
          status="good"
          firstName="Bambang"
          lastName="Johnson"
        />
        <Card
          title="Sample title 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dui dui. Sed nunc dolor, dignissim non neque vel, facilisis mollis metus. Donec at quam mauris. Suspendisse nec ultrices arcu, vitae euismod libero. Curabitur dolor tortor, pharetra sit amet nibh eget, feugiat tristique lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed sapien sit amet sapien vestibulum hendrerit in sed est. "
          image="images/penguin.jpg"
          status="meh"
          firstName="Mamang"
          lastName="Johnson"
        />
        <Card
          title="Sample title 3"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dui dui. Sed nunc dolor, dignissim non neque vel, facilisis mollis metus. Donec at quam mauris. Suspendisse nec ultrices arcu, vitae euismod libero. Curabitur dolor tortor, pharetra sit amet nibh eget, feugiat tristique lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed sapien sit amet sapien vestibulum hendrerit in sed est. "
          image="images/penguin.jpg"
          status="bad"
          firstName="Tatang"
          lastName="Johnson"
        />
      </div>
    </main>
  );
}
