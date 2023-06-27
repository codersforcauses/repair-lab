import { Inter } from "next/font/google";

import Dashboard from "./dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
      <div className="flex justify-between gap-4 px-4 pb-20 pt-12 ">
        <h1 className="text-2xl font-bold ">St Catherine’s Repair Event</h1>
        <h1 className="mr-8 text-2xl font-bold">Event Manager: Dan Hil</h1>
      </div>

      <p className="text-2xl font-bold"> Information </p>
      <Dashboard />
      <h1>Hello!</h1>
    </main>
  );
}
