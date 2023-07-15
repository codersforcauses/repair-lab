import { Inter } from "next/font/google";

<<<<<<< HEAD
import Modal from "@/components/Modal/index";
=======
import Button from "@/components/Button";
>>>>>>> 2651c5cc36cc53607af8e744dc39677792ec2370

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
<<<<<<< HEAD
      <Modal />
=======
      <h1>Hello!</h1>
      <Button aria-label="button"> Hello </Button>
>>>>>>> 2651c5cc36cc53607af8e744dc39677792ec2370
    </main>
  );
}
