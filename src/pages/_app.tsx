// page/_app.tsx
import { StrictMode } from "react";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </StrictMode>
  );
}

export default MyApp;
