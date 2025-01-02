import { Container, Heading, Text } from "@chakra-ui/react";
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import React from "react";
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "../../const/addresses";
import { useRouter } from "next/router";
import NFTGrid from "../../components/NFTGrid";

export default function ProfilePage() {
    const router = useRouter();
    const {contract: nftCollection} = useContract(NFT_COLLECTION_ADDRESS);

    const {data: ownedNfts, isLoading: loadingOwnedNfts} = useOwnedNFTs(
        nftCollection,
        router.query.address as string 

    );
    return (
        <Container maxW={"1200"} p={5}>
            <Heading fontFamily={"Silkscreen"}>{"NFT(s)"}</Heading>
            <Text>Управляйте своими NFT из нашей коллекции.</Text>
            <NFTGrid
            data={ownedNfts}
            isLoading={loadingOwnedNfts}
            emptyText={"Вы не владеете NFT"}
            />
        </Container>

    )
}