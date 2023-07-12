import { Inter } from "next/font/google";

import FieldImageUpload from "@/components/Form Fields/image-upload";

const inter = Inter({ subsets: ["latin"] });

export default function Test() {
  return (
    <main
      className={`container mx-auto flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <div className="flex w-full flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">Test Single</h2>
          <FieldImageUpload name="test" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Test Multiple</h2>
          <FieldImageUpload name="test" multiple />
        </div>
      </div>
    </main>
  );
}
