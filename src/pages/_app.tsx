// page/_app.tsx
import { StrictMode } from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "react-query";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <ClerkProvider clerkJSVariant="headless" {...pageProps}>
        <QueryClientProvider client={queryClient}>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </QueryClientProvider>
      </ClerkProvider>
    </StrictMode>
  );
}

export default MyApp;
