import { Avatar, Box, Container, Flex, Input, SimpleGrid, Skeleton, Stack, Text, useToast } from "@chakra-ui/react";
import { MediaRenderer, ThirdwebNftMedia, Web3Button, useContract, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Holesky } from "@thirdweb-dev/chains";

type Props = {
    nft: NFT;
    contractMetadata: any;
};

// Определение типа атрибутов NFT
type Attribute = {
    trait_type: string;
    value: string;
};

export default function TokenPage({ nft, contractMetadata }: Props) {
    const { contract: marketplace } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace-v3");
    const { data: directListing, isLoading: loadingDirectListing } = useValidDirectListings(marketplace, {
        tokenContract: process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
    });

    const [bidValue, setBidValue] = useState<string>();
    const toast = useToast();

    const { data: auctionListing, isLoading: loadingAuction } = useValidEnglishAuctions(marketplace, {
        tokenContract: process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
    });

    async function buyListing() {
        let txResult;

        if (auctionListing?.[0]) {
            txResult = await marketplace?.englishAuctions.buyoutAuction(auctionListing[0].id);
        } else if (directListing?.[0]) {
            txResult = await marketplace?.directListings.buyFromListing(directListing[0].id, 1);
        } else {
            throw new Error("Листинги не найдены.");
        }

        toast({
            title: "Успешно!",
            description: "Вы успешно приобрели NFT.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });

        return txResult;
    }

    async function createBidOffer() {
        let txResult;
        if (!bidValue || parseFloat(bidValue) <= 0) {
            toast({
                title: "Некорректная ставка",
                description: "Пожалуйста, введите корректное значение.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        if (auctionListing?.[0]) {
            txResult = await marketplace?.englishAuctions.makeBid(auctionListing[0].id, bidValue);
            toast({
                title: "Ставка размещена!",
                description: "Ваша ставка успешно размещена.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            throw new Error("Листинги не найдены.");
        }
        return txResult;
    }

    const attributes = nft.metadata.attributes as Attribute[] || [];

    return (
        <Container maxW={"1200px"} p={5} my={5}>
            <SimpleGrid columns={2} spacing={6}>
                <Stack spacing={"20px"}>
                    <Box borderRadius={"6px"} overflow={"hidden"}>
                        <Skeleton isLoaded={!loadingDirectListing}>
                            <ThirdwebNftMedia metadata={nft.metadata} width="100%" height="100%" />
                        </Skeleton>
                    </Box>
                    <Box>
                        <Text fontWeight={"bold"}>Описание NFT:</Text>
                        <Text>{nft.metadata.description}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={"bold"}>Особенности:</Text>
                        <SimpleGrid columns={2} spacing={4}>
                            {attributes.map((attr) => (
                                <Flex key={attr.trait_type} direction={"column"} alignItems={"center"} justifyContent={"center"} borderWidth={1}>
                                    <Text fontSize={"small"}>{attr.trait_type}</Text>
                                    <Text fontSize={"small"} fontWeight={"bold"}>{attr.value}</Text>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Stack>
                <Stack spacing={"20px"}>
                    {contractMetadata && (
                        <Flex alignItems={"center"}>
                            <Box borderRadius={"4px"} overflow={"hidden"} mr={"10px"}>
                                <MediaRenderer src={contractMetadata.image} height="32px" width="32px" />
                            </Box>
                            <Text fontWeight={"bold"}>{contractMetadata.name}</Text>
                        </Flex>
                    )}
                    <Box mx={2.5}>
                        <Text fontSize={"4xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
                        <Link href={`/profile/${nft.owner}`}>
                            <Flex direction={"row"} alignItems={"center"}>
                                <Avatar src='https://bit.ly/broken-link' h={"24px"} w={"24px"} mr={"10px"} />
                                <Text fontSize={"small"}>{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</Text>
                            </Flex>
                        </Link>
                    </Box>
                    <Stack backgroundColor={"#EEE"} p={2.5} borderRadius={"6px"}>
                        <Text color={"darkgray"}>Стоимость:</Text>
                        <Skeleton isLoaded={!loadingDirectListing}>
                            {directListing && directListing[0] ? (
                                <Text fontSize={"3xl"} fontWeight={"bold"}>
                                    {directListing[0]?.currencyValuePerToken.displayValue} {" " + directListing[0]?.currencyValuePerToken.symbol}
                                </Text>
                            ) : auctionListing && auctionListing[0] ? (
                                <Text fontSize={"3xl"} fontWeight={"bold"}>
                                    {auctionListing[0]?.buyoutCurrencyValue.displayValue} {" " + auctionListing[0]?.buyoutCurrencyValue.symbol}
                                </Text>
                            ) : (
                                <Text fontSize={"3xl"} fontWeight={"bold"}>Недоступно для покупки</Text>
                            )}
                        </Skeleton>
                        <Skeleton isLoaded={!loadingAuction}>
                            {auctionListing && auctionListing[0] && (
                                <Flex direction={"column"}>
                                    <Text color={"darkgray"}>Минимальная ставка</Text>
                                    <Text fontSize={"3xl"} fontWeight={"bold"}>
                                        {auctionListing[0]?.minimumBidCurrencyValue.displayValue} {" " + auctionListing[0]?.minimumBidCurrencyValue.symbol}
                                    </Text>
                                </Flex>
                            )}
                        </Skeleton>
                    </Stack>
                    <Skeleton isLoaded={!loadingDirectListing || !loadingAuction}>
                        <Web3Button
                            contractAddress={process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS}
                            action={async () => buyListing()}
                            isDisabled={(!auctionListing || !auctionListing[0]) && (!directListing || !directListing[0])}
                        >
                            Приобрести по цене выкупа
                        </Web3Button>
                        <Text align={"center"}>или</Text>
                        <Flex direction={"column"}>
                            <Input
                                mb={5}
                                defaultValue={auctionListing?.[0]?.minimumBidCurrencyValue?.displayValue || 0}
                                type={"number"}
                                onChange={(e) => setBidValue(e.target.value)}
                            />
                            <Web3Button
                                contractAddress={process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS}
                                action={async () => await createBidOffer()}
                                isDisabled={!auctionListing || !auctionListing[0]}
                            >
                                Разместить ставку
                            </Web3Button>
                        </Flex>
                    </Skeleton>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { contractAddress, tokenId } = context.params as { contractAddress: string; tokenId: string };

    // Проверка на наличие tokenId и contractAddress
    if (!tokenId || !contractAddress) {
        return { notFound: true };
    }

    // Логируем передаваемые значения
    console.log(`Fetching NFT with tokenId: ${tokenId} from contractAddress: ${contractAddress}`);

    const response = await fetch(`http://localhost:3000/api/nft/${contractAddress}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching data from API:", errorData);
        return { notFound: true };
    }

    const { nft, contractMetadata } = await response.json();

    return {
        props: {
            nft,
            contractMetadata: contractMetadata || null,
        },
        revalidate: 1,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};
