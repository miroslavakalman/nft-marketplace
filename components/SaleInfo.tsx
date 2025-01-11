import { NFT as NFTType } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Web3Button, useContract, useCreateDirectListing, useCreateAuctionListing } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { Box, Input, Stack, Tab, TabList, TabPanel, Tabs, TabPanels, Text } from "@chakra-ui/react";

type Props = {
    nft: NFTType;

};

type DirectFormData = {
    nftContractAddress: string;
    tokenId: string; 
    price: string;
    startDate: Date;
    endDate: Date;
};

type AuctionFormData = {
    nftContractAddress: string;
    tokenId: string; 
    price: string;
    startDate: Date;
    endDate: Date;
    floorPrice: string;
    buyoutPrice: string;
};

export default function SaleInfo({ nft }: Props) {
    const router = useRouter();
    const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

    const { mutateAsync: createDirectListing } = useCreateDirectListing(marketplace);
    
    const { mutateAsync: createAuctionListing } = useCreateAuctionListing(marketplace);

    async function checkAndProvideApproval() {
        const hasApproval = await nftCollection?.call(
            "isApprovedForAll",
            [nft.owner,
            MARKETPLACE_ADDRESS]
        );

        if (!hasApproval) {
            const txResult = await nftCollection?.call(
                "setApprovalForAll",
                [MARKETPLACE_ADDRESS,
                true]
            );
        
        if (txResult) {
            console.log("Approval Provided")
        }
    }
    return true;
}

    const { register: registerDirect, handleSubmit: handleSubmitDirect } = useForm<DirectFormData> ({
        defaultValues: {
            nftContractAddress: NFT_COLLECTION_ADDRESS,
            tokenId: nft.metadata.id,
            price: "0",
            startDate: new Date(),
            endDate: new Date(),
        },
    });

    async function handleSubmissionDirect(data: DirectFormData) {
        await checkAndProvideApproval();
        const txResult = await createDirectListing({
            assetContractAddress: data.nftContractAddress,
            tokenId: data.tokenId,
            pricePerToken: data.price,
            startTimestamp: new Date(data.startDate),
            endTimestamp: new Date(data.endDate),
        });

        return txResult;
    }

    const { register: registerAuction, handleSubmit: handleSubmitAuction } = useForm<AuctionFormData> ({
        defaultValues: {
            nftContractAddress: NFT_COLLECTION_ADDRESS,
            tokenId: nft.metadata.id,
            price: "0",
            startDate: new Date(),
            endDate: new Date(),
            floorPrice: "0",
            buyoutPrice: "0",
        },
    });

    async function handleSubmissionAuction(data: AuctionFormData) {
        await checkAndProvideApproval();
        const txResult = await createAuctionListing({
            assetContractAddress: data.nftContractAddress,
            tokenId: data.tokenId,
            buyoutBidAmount: data.buyoutPrice,
            minimumBidAmount: data.floorPrice,
            startTimestamp: new Date(data.startDate),
            endTimestamp: new Date(data.endDate),
        });

        return txResult;
    }
    

    return (
        <Tabs>
            <TabList>
                <Tab>Листинг</Tab>
                <Tab>Аукцион</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <Stack spacing={8}>
            <Box>
                <Text fontWeight={"bold"} mb={2}>Листинг</Text>
                <Text>Начало листинга:</Text>
                <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    {...registerDirect("startDate")}
                    />
                    <Text mt={2}>Окончание листинга:</Text>
                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        {...registerDirect("endDate")}
                    />
            </Box>
            <Box>
                <Text fontWeight={"bold"}>Стоимость в ETH:</Text>
                <Input
                    placeholder="0"
                    size="md"
                    type="number"
                    {...registerDirect("price")}
                    />
            </Box>
            <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}
                action={async () => {
                    await handleSubmitDirect(handleSubmissionDirect)();
                }}
                onSuccess={(txResult) => {
                    router.push(`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`);
                }}
                >Создать листинг</Web3Button>

        </Stack>
                </TabPanel>
                <TabPanel>
                <Stack spacing={8}>
            <Box>
                <Text fontWeight={"bold"} mb={2}>Аукцион</Text>
                <Text>Начало:</Text>
                <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    {...registerAuction("startDate")}
                    />
                    <Text mt={2}>Окончание:</Text>
                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        {...registerAuction("endDate")}
                    />
            </Box>
            <Box>
                <Text fontWeight={"bold"}>Минимальная ставка:</Text>
                <Input
                    placeholder="0"
                    size="md"
                    type="number"
                    {...registerAuction("floorPrice")}
                    />
            </Box>
            <Box>
                <Text fontWeight={"bold"}>Цена выкупа:</Text>
                <Input
                    placeholder="0"
                    size="md"
                    type="number"
                    {...registerAuction("buyoutPrice")}
                    />
            </Box>
            <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}
                action={async () => {
                    await handleSubmitAuction(handleSubmissionAuction)();
                }}
                onSuccess={(txResult) => {
                    router.push(`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`);
                }}
                >Создать аукцион</Web3Button>

        </Stack>
                </TabPanel>

            </TabPanels>

        </Tabs>
       
    )
}

