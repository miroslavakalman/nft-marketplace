import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Holesky } from "@thirdweb-dev/chains";
import { Navbar } from "../components/Navbar";
import "../styles/globals.css";
// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
const queryClient = new QueryClient();

const activeChain = Holesky;
// const sdk = new ThirdwebSDK("Holesky", {
//   secretKey: process.env.NEXT_PUBLIC_TW_SECRET_KEY, // Ensure you use the correct environment variable
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider 
      clientId="e10de960d66b0056fc1e8459ab643bc3"
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
