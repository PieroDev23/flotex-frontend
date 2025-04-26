import { Box, Button, Container, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Link } from "react-router";

export const ShowcaseSection: React.FC = () => {

  const [index, setIndex] = React.useState(0);

  const nextSlide = () => {
    if (index < 4 - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0)
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const imgMap = {
    0: "img/invierno.jpg",
    1: "img/verano.jpg",
    2: "img/primavera.jpg",
    3: "img/otonio.jpg"
  }
  return (
    <Flex align="center" bgColor="brand.secondary/10" py={55}>
      <Container
        pe={0}
        as={Flex}
        minH="full"
        alignItems="center"
        flexDir={{ base: "column", lg: "row" }}
        overflow="hidden"
        gap={10}
      >
        <Stack flexBasis="35%" gap={5} flexShrink={0}>
          <Heading size={{ base: "2xl", md: "5xl" }} fontWeight="bolder">
            ¡Haz notar tu estilo!
          </Heading>
          <Text fontSize={{ base: 13, md: 21 }}>
            Nuestros expertos han realizado ya varios prototipos inspirados en estilos modernos, clásicos y más.
          </Text>

          <Link to="/shop">
            <Button borderRadius="unset" w="fit" size="2xl">
              Explorar en Tienda
            </Button>
          </Link>
        </Stack>
        <Flex
          maxW={{ base: 350, lg: 700, xl: 900 }}
          align="center"
          width="full"
          overflow="hidden"
          position="relative"
          gap={5}
        >
          {[0, 1, 2, 3].map((e) => (
            <Box
              transform={`translateX(-${index * 105}%)`}
              transition="transform .2s ease-in-out"
              flexShrink={0}
              key={imgMap[e as keyof typeof imgMap]}
              bgImage={`url(${imgMap[e as keyof typeof imgMap]})`}
              bgSize="cover"
              bgPos="center"
              w={{ base: 300, md: 400 }}
              h={{ base: 400, md: 600 }}
            >
            </Box>
          ))}
          <IconButton
            onClick={() => nextSlide()}
            bgColor="white"
            borderRadius="full"
            shadow="lg"
            position="absolute"
            color="brand.secondary"
            right={0}
            zIndex="max"
            top="50%"
            transform="translate(-50%, -50%)"
            size="lg"
          >
            <LuArrowRight />
          </IconButton>

          <IconButton
            onClick={() => prevSlide()}
            bgColor="white"
            borderRadius="full"
            shadow="lg"
            position="absolute"
            color="brand.secondary"
            left={10}
            zIndex="max"
            top="50%"
            transform="translate(-50%, -50%)"
            size="lg"
          >
            <LuArrowLeft />
          </IconButton>
        </Flex>
      </Container>
    </Flex>
  );
};