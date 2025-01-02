import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import NFTGrid from "../components/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";

export default function Buy() {
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const { data, isLoading } = useNFTs(contract);
    return (
        <Container maxW={"1200px"} p={5}>
            <Heading fontFamily={"Silkscreen"}>ETHERART COLLECTION</Heading>
            <Text>Здесь вы можете приобрести NFT из нашей коллекции.</Text>
            <NFTGrid 
            isLoading={isLoading}
            data={data}
            emptyText={"NFT не найдено"}
        />
        </Container>
    )
}