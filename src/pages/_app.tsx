// page/_app.tsx
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import Sidebar from "@/components/sidebar/sidebar";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
    </ClerkProvider>
  );
}

export default MyApp;
