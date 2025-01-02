import { Avatar, Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from 'next/link';

export const Navbar = () => {
    const address = useAddress();

    return (
        <Box maxW={"100%"} m={"auto"} py={"10px"} px={"20px"} bg={"black"} color={"#E6BEAE"} className="navigation-comp">
            {/* Flex container for Navbar */}
            <Flex direction={{ base: "column", md: "row" }} justifyContent={"space-between"} alignItems={"center"} gap={4}>
                {/* Logo */}
                <Link as={NextLink} href='/'>
                    <Heading fontFamily={"Silkscreen"} fontWeight={"400"}>EtherArt</Heading>
                </Link>

                {/* Navigation links */}
                <Flex 
                    direction={{ base: "column", md: "row" }} 
                    alignItems={{ base: "center", md: "flex-start" }} 
                    gap={{ base: 2, md: 4 }}
                >
                    <Link as={NextLink} href='/buy'>
                        <Text>Купить NFT</Text>
                    </Link>
                    <Link as={NextLink} href='/sell'>
                        <Text>Продать NFT</Text>
                    </Link>
                    <Link as={NextLink} href="/admin">
                    <Text>Администраторам</Text>
                    </Link>
                    
                </Flex>

                {/* Wallet and Profile */}
                <Flex direction={{ base: "column", md: "row" }} alignItems={"center"} gap={2}>
                    <ConnectWallet />
                    {address && (
                        <Link as={NextLink} href={`/profile/${address}`}>
                            <Avatar src='https://bit.ly/broken-link' />
                        </Link>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};
