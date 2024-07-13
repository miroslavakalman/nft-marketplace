import { NextPage } from "next";
import { Container, Heading } from "@chakra-ui/react";
import AddNFT from "../components/AddNFT";

const AddNftPage: NextPage = () => {
  return (
    <Container maxW="1200px" p={5}>
      <Heading as="h1" mb={5}>
        Create and Mint NFT
      </Heading>
      <AddNFT />
    </Container>
  );
};

export default AddNftPage;
