import { Heading, Stack, Text } from "@chakra-ui/react"
import { LuInstagram } from "react-icons/lu"
import { Link } from "react-router"

export const SocialmediaSection = () => {
  return (
    <Stack as="section" align="center" gap={3} minH={144} justify="center" mb={55}>
      <Text>Comparte tu experiencia con nosotros</Text>
      <Heading fontWeight="bolder" fontSize="3xl">#FlotexTelas</Heading>
      <Link to="https://www.instagram.com/flotex.textil/" target="_blank">
        <LuInstagram size={34} />
      </Link>
    </Stack>
  )
}