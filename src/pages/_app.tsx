// page/_app.tsx
import { StrictMode } from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <ClerkProvider clerkJSVariant="headless" {...pageProps}>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </ClerkProvider>
    </StrictMode>
  );
}

export default MyApp;
