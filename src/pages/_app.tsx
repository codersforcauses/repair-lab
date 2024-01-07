// page/_app.tsx
import { StrictMode } from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Toast from "@/components/Toast";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <ClerkProvider clerkJSVariant="headless" {...pageProps}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <main className={`${inter.className}`}>
            <Component {...pageProps} />
            <Toast position="bottom-center" />
          </main>
        </QueryClientProvider>
      </ClerkProvider>
    </StrictMode>
  );
}

export default MyApp;
