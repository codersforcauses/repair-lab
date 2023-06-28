import { Inter } from "next/font/google";

import Dashboard from "./dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
      <Dashboard />
    </main>
  );
}
