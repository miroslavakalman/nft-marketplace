import { NextPage } from "next";
import CreateTicketForm from "../components/CreateTicketForm";
import { Container, Flex, Heading, Stack, Text, Box, Image, Button } from "@chakra-ui/react";
import NextLink from 'next/link';

const Home: NextPage = () => {
  return (
    <Container maxW="100%" p={0} m={0}>
      <Flex h="80vh" align="center" justify="center" bg="black" className="main-cont">
        <Stack spacing={4} align="center">
          <Heading 
            className="heading-ether" 
            fontFamily="Silkscreen" 
            fontSize={{ base: "48px", md: "120px" }} 
            color="#E6BEAE"
          >
            ETHERART
          </Heading>
          <Button as={NextLink} href='/buy' bg="#A4735F" fontSize={{ base: "sm", md: "md" }}>
            Начать покупки
          </Button>
        </Stack>
      </Flex>

      <Box className="welcome" p={{ base: 5, md: 120 }}>
        <Flex flexDirection="column" alignItems="center">
          <Heading 
            fontWeight="400" 
            fontSize={{ base: "28px", md: "48px" }} 
            lineHeight={{ base: "110%", md: "120%" }} 
            color="#000" 
            fontFamily="Silkscreen"
          >
            Cyberworld of Art
          </Heading>
          <Flex className="welcome-row" flexDirection="column" gap={5} mt={10} alignItems="center">
            <Flex className="welcome-row-content" flexDirection="column" gap={10}>
              <Text 
                fontWeight="500" 
                fontSize={{ base: "14px", md: "20px" }} 
                lineHeight={{ base: "130%", md: "150%" }} 
                color="#000" 
                width={{ base: "100%", md: "480px" }}
              >
                EtherArt — это не просто ещё одна площадка для NFT. Это место, где уникальные цифровые активы обретают жизнь в яркой и динамичной вселенной. Добро пожаловать в мир, где каждый токен — это отражение креативности и цифровой собственности, управляемое технологией блокчейн.

                </Text>
              <Text 
                fontWeight="500" 
                fontSize={{ base: "14px", md: "20px" }} 
                lineHeight={{ base: "130%", md: "150%" }} 
                color="#000" 
                width={{ base: "100%", md: "480px" }}
              >
                Будьте смелыми и уверенными на пути к цифровой эволюции. Присоединяйтесь к EtherArt, платформе, открывающей новые горизонты для вашего творчества и инвестиций.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box className="glimpse" p={{ base: 5, md: 10 }} justifyContent="center" alignItems="center">
        <Flex className="image-container" flexDirection="row" gap={{ base: 2, md: 5 }}>
          <Image src="/images/Group 1.png" alt="Group 1" />
        </Flex>
        <Flex className="glimpse-content" flexDirection="column" gap={{ base: 2, md: 3 }} mt={{ base: 5, md: 90 }}>
          <Image src="/images/SVG-1.png" alt="SVG-1" height="150px" width="150px" />
          <Heading 
            fontWeight="400" 
            fontSize={{ base: "20px", md: "32px" }} 
            lineHeight={{ base: "110%", md: "120%" }} 
            color="#000" 
            width={{ base: "100%", md: "286px" }}
          >
            Новый взгляд на искусство
          </Heading>
          <Text 
            fontWeight="500" 
            fontSize={{ base: "14px", md: "16px" }} 
            lineHeight={{ base: "130%", md: "150%" }} 
            color="#000" 
            width={{ base: "100%", md: "400px" }}
          >
          Вдохните жизнь в коллекции, переполненные уникальными цифровыми произведениями искусства, созданными нашими талантливыми художниками. В каждой коллекции — эксклюзивные произведения, которые впишутся в любую коллекцию и станут гордостью её владельца.

          </Text>
        </Flex>
      </Box>
      <Heading 
            fontWeight="400" 
            fontSize={{ base: "28px", md: "48px" }} 
            lineHeight={{ base: "110%", md: "120%" }} 
            color="#000" 
            textAlign={"center"}
            fontFamily="Silkscreen"
            marginTop={"80px"}
          >
          Happy Artists 
          </Heading>


      <Box className="cards" p={5} mt={10}>
        <Flex flexDirection="row" gap={5} justifyContent="center" alignItems="center">
          <Box 
            className="card" 
            bg="#e0ae9b" 
            width={{ base: "240px", md: "320px" }} 
            height={{ base: "260px", md: "344px" }} 
            display="flex" 
            flexDirection="column" 
            gap={4} 
            justifyContent="center" 
            alignItems="center"
          >
            <Image src="/images/Vector-1.png" alt="Happy Artists" width="35px" height="54px" />
            <Heading fontFamily="Silkscreen" fontWeight="400" fontSize={{ base: "32px", md: "48px" }} color="#000">
              10,000
            </Heading>
            <Text 
              fontWeight="700" 
              fontSize={{ base: "14px", md: "16px" }} 
              lineHeight={{ base: "130%", md: "150%" }} 
              letterSpacing="-0.03em" 
              textAlign="center" 
              color="#000"
            >
              владельцев токенов
            </Text>
          </Box>

          <Box 
            className="card" 
            bg="#a8d5ba" 
            width={{ base: "240px", md: "320px" }} 
            height={{ base: "260px", md: "344px" }} 
            display="flex" 
            flexDirection="column" 
            gap={4} 
            justifyContent="center" 
            alignItems="center"
          >
            <Image src="/images/Vector-1.png" alt="Happy Artists" width="35px" height="54px" />
            <Heading fontFamily="Silkscreen" fontWeight="400" fontSize={{ base: "32px", md: "48px" }} color="#000">
              100
            </Heading>
            <Text 
              fontWeight="700" 
              fontSize={{ base: "14px", md: "16px" }} 
              lineHeight={{ base: "130%", md: "150%" }} 
              letterSpacing="-0.03em" 
              textAlign="center" 
              color="#000"
            >
              уникальных коллекций
            </Text>
          </Box>

          <Box 
            className="card" 
            bg="#f3d2c1" 
            width={{ base: "240px", md: "320px" }} 
            height={{ base: "260px", md: "344px" }} 
            display="flex" 
            flexDirection="column" 
            gap={4} 
            justifyContent="center" 
            alignItems="center"
          >
            <Image src="/images/Vector-1.png" alt="Happy Artists" width="35px" height="54px" />
            <Heading fontFamily="Silkscreen" fontWeight="400" fontSize={{ base: "32px", md: "48px" }} color="#000">
              10
            </Heading>
            <Text 
              fontWeight="700" 
              fontSize={{ base: "14px", md: "16px" }} 
              lineHeight={{ base: "130%", md: "150%" }} 
              letterSpacing="-0.03em" 
              textAlign="center" 
              color="#000"
            >
              стран с участниками
            </Text>
          </Box>
        </Flex>
      </Box>
      <CreateTicketForm />

      <Box>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" gap={4}>
          <Text fontWeight="500" fontSize={{ base: "12px", md: "16px" }} lineHeight={{ base: "130%", md: "150%" }} color="#000" mt={"90px"}>
            ©2024 EtherArt | Embrace the Digital Evolution
          </Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default Home;
