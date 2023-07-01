// Terms and Conditions Pop-up

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <label className="flex h-6 items-center">
        <input type="checkbox" />
        <span className="pl-2 text-sm">
        I accept the Terms and Conditions.
        </span>
      </label>
    </main>
  );
}