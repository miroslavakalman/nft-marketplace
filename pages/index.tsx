import { NextPage } from "next";
import { Container, Flex, Heading, Stack, Text, Box, Image } from "@chakra-ui/react";
import NextLink from 'next/link';
import { Button } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Container maxW="100%" p={0} m={0}>
      <Flex h="80vh" align="center" justify="center" bg="black" className="main-cont">
        <Stack spacing={4} align="center">
          <Heading fontFamily="Silkscreen" fontSize="180" color="#E6BEAE">
            ETHERART
          </Heading>
          <Button as={NextLink} href='/buy' bg="#A4735F">
            Shop Lifetime Dapps
          </Button>
        </Stack>
      </Flex>
      <Box className="welcome" p={120}>
        <Flex flexDirection="column" alignItems="center">
          <Heading fontFamily="Inter" fontWeight="400" fontSize="48px" lineHeight="120%" color="#000" fontFamily="Silkscreen">
            Welcome to the Cyberworld of Art
          </Heading>
          <Flex className="welcome-row" flexDirection="column" gap={5} mt={10} alignItems="center">
            <Flex className="welcome-row-content" flexDirection="row" gap={10}>
              <Text fontWeight="500" fontSize="20px" lineHeight="150%" color="#000" width="480px">
                EtherArt isn’t just another NFT marketplace. Welcome aboard onto a vibrant cosmos, gleefully aglow with unique digital assets known as NFTs.
              </Text>
              <Text fontWeight="500" fontSize="20px" lineHeight="150%" color="#000" width="480px">
                Powered by airtight blockchain technology, stride without fear into the future of creativity and digital ownership here at EtherArt.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box className="glimpse" p={5} justifyContent="center" alignItems="center">
        <Flex className="image-container" flexDirection="row" gap={5}>
          <Image src="/images/Group 1.png" alt="Group 1" />
        </Flex>
        <Flex className="glimpse-content" flexDirection="column" gap={3} mt={90}>
          <Image src="/images/SVG-1.png" alt="SVG-1" height="150px" width="150px" />
          <Heading fontWeight="400" fontSize="32px" lineHeight="120%" color="#000" width="286px" >
            A Glimpse into our treasure trove
          </Heading>
          <Text fontWeight="500" fontSize="16px" lineHeight="150%" color="#000" width="400px">
            Our glorious NFT collections burst with digital extrapolations of hidden passions and uncharted dreams. Hover, stare, wonder!
          </Text>
        </Flex>
      </Box>
      <Box className="cards" p={5} mt={10}>
        <Flex flexDirection="row" gap={5} justifyContent="center" alignItems="center">
          <Box className="card" bg="#e0ae9b" width="320px" height="344px" display="flex" flexDirection="column" gap={4} justifyContent="center" alignItems="center">
            <Image src="/images/Vector-1.png" alt="Happy Artists" width="35px" height="54px" />
            <Heading fontFamily="Silkscreen" fontWeight="400" fontSize="48px" color="#000">
              10,000
            </Heading>
            <Text fontWeight="700" fontSize="16px" lineHeight="150%" letterSpacing="-0.03em" textAlign="center" color="#000" mt={0}>
              Happy Artists
            </Text>
          </Box>
          <Box className="card" bg="#e0ae9b" width="320px" height="344px" display="flex" flexDirection="column" gap={4} justifyContent="center" alignItems="center">
            <Image src="/images/SVG-2.png" alt="NFTs Traded" />
            <Heading fontFamily="Silkscreen" fontWeight="400" fontSize="48px" color="#000">
              100,000
            </Heading>
            <Text fontWeight="700" fontSize="16px" lineHeight="150%" letterSpacing="-0.03em" textAlign="center" color="#000" mt={0}>
              NFTs Traded
            </Text>
          </Box>
          <Box className="card" bg="#e0ae9b" width="320px" height="344px" display="flex" flexDirection="column" gap={4} justifyContent="center" alignItems="center">
            <Image src="/images/SVG-3.png" alt="Active Countries" />
            <Heading fontFamily="Silkscreen" fontWeight="400" fontSize="48px" color="#000">
              100
            </Heading>
            <Text fontWeight="700" fontSize="16px" lineHeight="150%" letterSpacing="-0.03em" textAlign="center" color="#000" mt={0}>
              Active Countries
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box className="ownership" p={5} mt={40}>
        <Flex flexDirection="row" gap={20} justifyContent="center" alignItems="center">
          <Box className="ownership-text" flexDirection="column" gap={0}>
            <Heading fontWeight="400" fontSize="48px" lineHeight="120%" color="#000" width="652px" >
              Ever Pondered the Future of Ownership?
            </Heading>
            <Text fontWeight="500" fontSize="16px" lineHeight="150%" color="#000" width="561px" mt={4}>
              EtherArt catapults you into a futuristic vision of ownership. NFTs aren’t just fancy jargon — they’re the rightful claim to your digital possessions. <br />
              With EtherArt, your unique thumbprint ties you to your pieces, creating an unbreakable bond forged in the fires of the blockchain. <br />
              Don’t stand by watching. Jump in, and claim your slice of the digital world.
            </Text>
          </Box>
          <Image src="/images/SVG-4.png" alt="Future of Ownership" width="200px" height="200px" />
        </Flex>
      </Box>
      <Box className="actions" p={5} mt={10}>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" gap={4}>
          <Image src="/images/SVG-6.png" alt="Actions" />
          <Heading textAlign="center" fontWeight="400" fontSize="32px" color="#000" width="400px">
            Don’t let your creativity be confined. Ctrl+V your art into NFTs.
          </Heading>
          <Flex className="buttons" gap={4} mt={8 }>
            <Button as={NextLink} href='/buy' bg="#A4735F">
              Create NFT
            </Button>
            <Button as={NextLink} href='/buy' bg="#A4735F">
              Learn More
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box className="wrap-img" p={5} mt={10}>
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Image src="/images/SVG-1.png" alt="wrap-img" />
          <Image src="/images/SVG-2.png" alt="wrap-img" />
          <Image src="/images/SVG-3.png" alt="wrap-img" />
        </Flex>
      </Box>

      <Box>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" gap={4}>
        <Text fontWeight="500" fontSize="16px" lineHeight="150%" color="#000">©2024 EtherArt | Embrace the Digital Evolution</Text>
      </Flex>
      </Box>

    </Container>
  );
};










export default Home;
