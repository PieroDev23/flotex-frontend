import { Container, Flex, Heading, IconButton, Menu, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { LuMenu } from "react-icons/lu"
import { ActionsMenu } from "./ActionsMenu"
import { NavigationMenu } from "./NavigationMenu"

const NavigationMobileMenu: React.FC = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild display={{ base: "flex", md: "none" }} justifyContent="center">
        <IconButton bgColor="transparent">
          <LuMenu />
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content p={21} minW={144}>
          <NavigationMenu flexDir="column" align="flex-start" />
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const Header: React.FC = () => {
  return (
    <Flex as="header" minH={89} align="center" borderBottom="1px solid {gray/20}" position="sticky" top={0} bgColor="brand.primary" color="white" zIndex="max">
      <Container as={Flex} justifyContent="space-between" minH="full" alignItems="center">
        <Stack gap={0}>
          <Heading m={0} size="3xl" fontWeight="bolder" color="brand.secondary">Flotex</Heading>
          <Text textStyle="xs">Calidad e innovación textil</Text>
        </Stack>
        <Flex align="center">
          <NavigationMenu me={55} display={{ base: "none", sm: "none", md: "flex" }} />
          <ActionsMenu />
          <NavigationMobileMenu />
        </Flex>
      </Container>
    </Flex>
  )
}
