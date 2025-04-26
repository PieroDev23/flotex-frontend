import { Button, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router"



export const Hero = () => {
  return (
    <Flex p={{ base: 13, lg: 144 }} bgColor="gray" bgImage="url('img/hero.jpg')" bgSize="cover" bgRepeat="no-repeat" bgPos="center">
      <Container as={Flex} alignItems="center" justifyContent={{ base: "center", md: "flex-end" }}>
        <Stack bgColor="white" p={{ base: 34, lg: 55 }} gap={21}>
          <Text letterSpacing={2}>Nuevo lanzamiento</Text>
          <Heading size={{ base: "2xl", lg: "5xl" }} fontWeight="bold">Descubre nuestra <br /> nueva colección</Heading>
          <Text w={{ base: "auto", md: "34ch", lg: "50ch" }}>
            ¡Hemos estrenado nuevo sitio web! Descubre nuestro nuevo lanzamiento especial.
          </Text>
          <Link to="/shop" style={{ width: "fit-content" }}>
            <Button w="fit" size={{ base: "sm", lg: "2xl" }} borderRadius="unset">
              Explorar ahora
            </Button>
          </Link>
        </Stack>
      </Container>
    </Flex>
  )
}