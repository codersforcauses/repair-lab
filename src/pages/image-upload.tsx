import { Inter } from "next/font/google";

import FileUpload from "@/components/FileUpload";

const inter = Inter({ subsets: ["latin"] });

export default function ImageUpload() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <FileUpload />
    </main>
  );
}
