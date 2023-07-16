import { Inter } from "next/font/google";
import { useClerk } from "@clerk/nextjs";

import Button from "@/components/Button";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { signOut } = useClerk();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Hello!</h1>
      <Button onClick={() => signOut()}>Logout</Button>
    </main>
  );
}
