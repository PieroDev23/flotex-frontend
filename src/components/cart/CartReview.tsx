import { Button, Flex, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useShop } from "../../context/ShopContext";
import { Link } from "react-router";



export const CartReview: React.FC = () => {
  const { cart } = useShop();
  return (
    <Stack gap={13} p={21} maxH="fit">
      <Heading size="2xl">Detalle del Carrito</Heading>
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
        <Link to="/checkout">
          <Button
            borderRadius="unset"
            w="full"
            m="auto">
            ir a pagar
          </Button>
        </Link>
      </Stack>
    </Stack>
  )
}