import { Avatar, Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from 'next/link';

export const Navbar = () => {
    const address = useAddress();
    
    return (
        <Box maxW={"100%"} m={"auto"} py={"10px"} px={"40px"} bg={"black"} color={"#E6BEAE"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Link as={NextLink} href='/'>
                    <Heading fontFamily={"Silkscreen"} fontWeight={"400"}>EtherArt</Heading>
                </Link>
                <Flex direction={"row"}>
                <Link as={NextLink} href='/buy' mx={2.5}>
                    <Text>Explore</Text>
                </Link>
                <Link as={NextLink} href='/buy' mx={2.5}>
                    <Text>BUY</Text>
                </Link>
                <Link as={NextLink} href='/sell' mx={2.5}>
                    <Text>SELL</Text>
                </Link>
                </Flex>
                <Flex dir={"row"} alignItems={"center"}>
                    <ConnectWallet/>
                    {address && (
                        <Link as={NextLink} href={`/profile/${address}`}>
                            <Avatar src='https://bit.ly/broken-link' ml={"20px"}/>
                        </Link>
                    )}
                </Flex>
            </Flex>
        </Box>
    )
}