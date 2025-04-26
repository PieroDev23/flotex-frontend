import { Button, Flex, Heading, HStack, IconButton, NumberInput, RatingGroup, Separator, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { LuMinus, LuPlus } from "react-icons/lu"
import { useShop } from "../../../context/ShopContext"
import { Product } from "../../../types"




export const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  const { name, price, sku, description, id, imageUrl } = product;
  const quantity = React.useRef<number>(0);
  const { onAddCart, setOpen } = useShop();

  return (
    <Stack gap={5}>
      <Stack gap={5}>
        <Heading size="4xl" fontWeight="normal">{name}</Heading>
        <Heading size="3xl" as="h2" color="fg.muted/60">S/. {price?.toFixed(2)}</Heading>
        <Flex align="center" gap={13}>
          <RatingGroup.Root readOnly count={5} defaultValue={3} size="md" colorPalette="yellow">
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
          <Separator orientation="vertical" height={8} />
          <Text fontSize={13} color="fg.muted/60">Producto bien calificado</Text>
        </Flex>
      </Stack>
      <Stack gap={5}>
        <Text>{description}</Text>
        <Flex align="center" gap={21}>
          <NumberInput.Root defaultValue="0"
            unstyled
            spinOnPress={false}
            min={0}
            onValueChange={(e) => quantity.current = e.valueAsNumber}>
            <HStack gap="2">
              <NumberInput.DecrementTrigger asChild>
                <IconButton variant="outline" size="sm" borderRadius="unset">
                  <LuMinus />
                </IconButton>
              </NumberInput.DecrementTrigger>
              <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
              <NumberInput.IncrementTrigger asChild>
                <IconButton variant="outline" size="sm" borderRadius="unset">
                  <LuPlus />
                </IconButton>
              </NumberInput.IncrementTrigger>
            </HStack>
          </NumberInput.Root>
          <Button
            size="xl"
            borderRadius="unset"
            onClick={() => {
              onAddCart({ id, imageUrl, name, price, quantity: quantity.current > 0 ? quantity.current : 1 });
              setOpen(true);
            }}>
            Añadir al carrito
          </Button>
        </Flex>
      </Stack>
      <Separator mt={23} />
      <Stack color="fg.muted/60" fontSize={13} mt={21}>
        <Text>SKU : {sku}</Text>
      </Stack>
    </Stack>
  )
}