import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Holesky } from "@thirdweb-dev/chains";
import { Navbar } from "../components/Navbar";
import "../styles/globals.css";
const queryClient = new QueryClient();

const activeChain = Holesky;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider 
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY} 
      activeChain={activeChain}>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
