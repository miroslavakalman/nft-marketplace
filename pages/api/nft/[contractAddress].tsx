import { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Holesky } from "@thirdweb-dev/chains";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { contractAddress } = req.query;

    // Проверка на наличие contractAddress
    if (!contractAddress || typeof contractAddress !== 'string') {
        return res.status(400).json({ error: "Invalid contract address" });
    }

    const tokenId = req.body.tokenId; // Получаем tokenId из тела запроса
    const sdk = new ThirdwebSDK(Holesky, {
        secretKey: process.env.NEXT_PUBLIC_TW_SECRET_KEY,
    });

    try {
        const contract = await sdk.getContract(contractAddress);
        const nft = await contract.erc721.get(tokenId as string);
        const contractMetadata = await contract.metadata.get();

        res.status(200).json({ nft, contractMetadata });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch NFT data" });
    }
}
