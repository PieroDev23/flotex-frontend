import { Heading, Stack, Text } from "@chakra-ui/react";
import { LuClock, LuLink } from "react-icons/lu";


export const InhouseDetails = () => {
  return (
    <Stack>
      <Stack gap="3">
        <Heading size="md">Recoge tu pedido en:</Heading>
        <Stack>
          <Text display="inline-flex" alignItems="center" gap="2" textStyle={{ base: "xs", md: "md" }}>
            <LuLink color="brand.secondary" />
            Estacionamiento Flotex: Av. Italia 1751-La victoria Lima (frente a shalom)
          </Text>
          <Text display="inline-flex" alignItems="center" gap="2" textStyle={{ base: "xs", md: "md" }}>
            <LuClock color="brand.secondary" />
            Lunes a sabado de 9:00 am a 5:00 pm
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}