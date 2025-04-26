import { Box, CloseButton, Drawer, Flex, Heading, IconButton, Image, Separator, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuCircleAlert, LuCreditCard, LuShoppingCart, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router";
import { useShop } from "../../context/ShopContext";

export const CartWidget = () => {
  const {
    cart,
    open,
    onDeleteCart,
    onDumpCart,
    setOpen } = useShop();

  const avalableItems = cart.products.length > 0
  return (
    <Drawer.Root open={open} onOpenChange={e => setOpen(e.open)} >
      <Drawer.Trigger asChild>
        <IconButton bg="transparent" position="relative">
          {
            avalableItems && (
              <LuCircleAlert
                style={{
                  borderRadius: "full",
                  fontWeight: "bolder",
                  top: -5,
                  right: -5,
                  position: "absolute",
                }}
              />
            )
          }
          <LuShoppingCart />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content color="black">
          <Drawer.Header>
            <Drawer.Title fontSize="2xl">
              Carrito <Text fontSize="md" as="span" fontWeight="normal">
                ({cart.products.reduce((prev, curr) => curr.quantity + prev, 0)} items)
              </Text>
            </Drawer.Title>
          </Drawer.Header>

          <Separator m="auto" w="90%" />
          <Drawer.Body pt={21}>
            {!avalableItems ?
              <Text> El carrito está vacío.</Text> : (
                <Stack gap={13}>
                  {cart.products.map((item) => (
                    <Stack key={item.id} pb={2} borderBottom="1px solid gray">
                      <Flex gap={13} align="flex-start" flexDir="row-reverse">
                        <Box w={70} h={70} flexShrink={0}>
                          <Image
                            objectFit="cover"
                            w="full"
                            h="full"
                            src={item.imageUrl}
                          />
                        </Box>
                        <Stack w="full" justify="space-between">
                          <Stack gap={1} justify="space-between">
                            <Heading size="sm" lineClamp={1}>{item.name}</Heading>
                            <Text fontSize={13}> S/. {(item.price * item.quantity).toFixed(2)} (x{item.quantity})</Text>
                          </Stack>
                          <Text
                            fontSize={13}
                            w="fit"
                            _hover={{ cursor: "pointer" }}
                            textDecor="underline"
                            onClick={() => onDeleteCart(item)}
                          >
                            Eliminar
                          </Text>
                        </Stack>
                      </Flex>
                    </Stack>
                  ))}
                </Stack>
              )}
          </Drawer.Body>
          <Drawer.Footer>
            <Stack w="full" gap={13}>
              <Link to="/checkout" style={{ display: "block" }} onClick={() => setOpen(false)}>
                <IconButton borderRadius="unset" minW="full">
                  <LuCreditCard />
                  Proceder a Pagar - S/.{cart.total.toFixed(2)}
                </IconButton>
              </Link>
              <IconButton
                w="full"
                borderRadius="unset"
                variant="outline"
                border="1px solid black"
                onClick={() => onDumpCart()}
              >
                <LuTrash2 />
                Vaciar carrito
              </IconButton>
            </Stack>
          </Drawer.Footer>
          <Drawer.CloseTrigger asChild>
            <CloseButton />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}

export const ActionsMenu: React.FC = () => {
  return (
    <Flex align="center">
      {/* <IconButton bg="transparent" color="black" >
        <LuHeart />
      </IconButton> */}
      {/* <IconButton bg="transparent" color="black">
        <LuUser />
      </IconButton> */}
      <CartWidget />
    </Flex>
  )
}
