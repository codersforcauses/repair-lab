import { Inter } from "next/font/google";

import RepairRequest from "@/pages/repair-request";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
      <RepairRequest />
    </main>
  );
}
