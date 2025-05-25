import { Button, Flex, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";
import { useCheckout } from "../../context/CheckoutContext";
import { useShop } from "../../context/ShopContext";




export const CheckoutReview: React.FC = () => {
  const { cart } = useShop();
  const { step, isMutating } = useCheckout();
  return (
    <Stack gap={13} p={21} maxH="fit">
      <Heading size="2xl">Detalle de la orden</Heading>
      <Stack gap={13}>
        <Flex justify="space-between" align="center">
          <Heading size="sm">Productos</Heading>
          <Heading size="sm">Precio</Heading>
        </Flex>
        <Separator borderColor="black" />
        <Stack gap={13}>
          {
            cart.products.map(i => (
              <Flex justify="space-between" align="center" key={i.id}>
                <Text lineClamp={1}>{i.name} <Text as="span" fontWeight="semibold">x{i.quantity}</Text></Text>
                <Text >S/.{(i.quantity * Number(i.price)).toFixed(2)}</Text>
              </Flex>
            ))
          }
        </Stack>
        <Separator borderColor="black" />
        <Flex justify="space-between" align="center">
          <Heading size="sm">Subtotal</Heading>
          <Heading size="sm">S/. {cart.total.toFixed(2)} </Heading>
        </Flex>
        <Flex justify="space-between" align="center">
          <Heading size="md">Total</Heading>
          <Heading size="xl">S/. {cart.total.toFixed(2)}</Heading>
        </Flex>
        <Button
          bgColor="brand.primary"
          color="white"
          loading={isMutating}
          type="submit"
          borderRadius="unset"
          w="full"
          m="auto">
          {step === 0 ? "Escoger método de entrega" : "Realizar orden"}
        </Button>
        <Text fontSize={13} color="fg.muted">
          Sus datos personales se utilizarán para respaldar su experiencia en este sitio web, para administrar el acceso a su cuenta y para otros fines descritos en nuestra <Link style={{ fontWeight: "bolder", textDecoration: "underline" }} to="/privacy"> política de privacidad.</Link>
        </Text>
      </Stack>
    </Stack>
  )
}