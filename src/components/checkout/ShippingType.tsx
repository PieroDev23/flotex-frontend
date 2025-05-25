import { Button, Flex, Heading, Stack, Strong, Text } from "@chakra-ui/react"
import { LuPin, LuTruck } from "react-icons/lu"
import { useCheckout } from "../../context/CheckoutContext"
import { InhouseDetails } from "./InhouseDetails"
import { ShippingInformation } from "./ShippingInformation"



const SHIPPING_TYPE_VIEW = {
  "SHIPPING": <ShippingInformation />,
  "INHOUSE": <InhouseDetails />
}

export const ShippingType = () => {
  const { setShippingType, shippingType, setValue } = useCheckout();
  return (
    <Stack gap="8">
      <Stack gap="3">
        <Heading size="2xl">Escoge como vas a recibir tu pedido</Heading>
        <Text textStyle="sm">Los envíos se realizan los <Strong textDecor="underline">Lunes de cada semana entre las 9:00 am a 5:00 pm</Strong></Text>
      </Stack>
      <Flex align="center" gap="3" flexWrap="wrap">
        <Button
          variant={shippingType === "SHIPPING" ? "solid" : "outline"}
          onClick={() => {
            setShippingType("SHIPPING");
            setValue("shippingType", "SHIPPING")
          }}
          flex="1 1 0"
        >
          <LuTruck />
          Enviar a dirección
        </Button>
        <Button
          variant={shippingType === "INHOUSE" ? "solid" : "outline"}
          onClick={() => {
            setShippingType("INHOUSE")
            setValue("shippingType", "INHOUSE")
          }}
          flex="1 1 0"
        >
          <LuPin />
          Recoger en tienda
        </Button>
      </Flex>
      {SHIPPING_TYPE_VIEW[shippingType]}
    </Stack>
  )
}