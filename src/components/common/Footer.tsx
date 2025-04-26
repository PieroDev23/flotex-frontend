import { Container, Flex, Heading, Separator, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router"
import { NavigationMenu } from "./NavigationMenu"



export const Footer: React.FC = () => {
  return (
    <Flex as="footer" minH={300} borderTop="1px solid {gray/20}" py={34} bgColor="#142142" color="white">
      <Container>
        <Flex align={{ base: "center", lg: "flex-start" }} justify={{ base: "center", lg: "space-between" }} gap={{ base: 55, lg: 144 }} flexDir={{ base: "column", lg: "row" }}>
          <Stack gap={{ base: 13, lg: 55 }} textAlign={{ base: "center", lg: "left" }}>
            <Stack gap={0}>
              <Heading m={0} size="3xl" fontWeight="bolder" color="brand.secondary">Flotex</Heading>
              <Text textStyle="xs">Calidad e innovación textil</Text>
            </Stack>
            <Text fontWeight="normal" textStyle="sm">
              Jr.Antonio Bazo 1070, La Victoria.  <br /> Lima, Peru 01
            </Text>
          </Stack>
          <Stack gap={{ base: 13, lg: 55 }} textAlign={{ base: "center", lg: "left" }}>
            <Heading size="md" color="brand.secondary">Rutas</Heading>
            <NavigationMenu flexDir="column" align={{ base: "center", lg: "flex-start" }} />
          </Stack>
          <Stack gap={{ base: 13, lg: 55 }} textAlign={{ base: "center", lg: "left" }}>
            <Heading size="md" color="brand.secondary">Ayuda</Heading>
            <Stack gap={{ base: 13, lg: 21 }} >
              <Link to="/faq">FAQ</Link>
              <Link to="/privacy">Políticas de privacidad</Link>
            </Stack>
          </Stack>
          <Stack gap={{ base: 13, lg: 55 }} textAlign={{ base: "center", lg: "left" }}>
            {/* <Heading size="md" color="gray.400">Newsletter</Heading>
            <Flex align="center" gap={{ base: 13, lg: 21 }}>
              <Input placeholder="Ingresa tu email" variant="flushed" />
              <Button w="fit" px="unset" bg="transparent" color="black" borderRadius="unset" borderBottom="1px solid black">Suscribirse</Button>
            </Flex> */}
          </Stack>
        </Flex>
        <Separator my={55} />
        <Text textAlign="center">© {new Date().getFullYear()} Todos los derechos reservados.</Text>
      </Container >
    </Flex >
  )
}