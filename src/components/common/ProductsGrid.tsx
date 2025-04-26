import { Box, Button, Flex, Grid, Heading, Image, Skeleton, SkeletonText, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router";
import { useShop } from "../../context/ShopContext";
import { Product } from "../../types";





const ProductCard: React.FC<Product> = (product) => {
  const {
    id,
    description,
    imageUrl,
    price,
    discount,
    name,
  } = product;

  const { onAddCart, setOpen, cart } = useShop();
  const itemIndex = cart.products.findIndex(i => i.id === id);
  const currentItem = cart.products[itemIndex];

  return (
    <Stack gap={0} minH="full">
      <Box w="100%" position="relative">
        <Image
          display="block"
          objectFit="cover"
          w="full"
          h="full"
          src={imageUrl}
          alt={name}
        />
        {
          discount && (
            <Flex
              align="center"
              justify="center"
              borderRadius="full"
              bgColor="red.400"
              position="absolute"
              top={3}
              right={3}
              w={55}
              h={55}
              color="white"
            >
              -{discount}%
            </Flex>
          )
        }
        <Flex
          flexDir="column"
          gap={13}
          opacity={0}
          transition="opacity 100ms ease-in-out"
          _hover={{ opacity: 1 }}
          justify="center"
          align="center"
          position="absolute"
          top={0} bgColor="black/50"
          w="full"
          h="full"
        >
          <Button
            w="90%"
            borderRadius="unset"
            color="black"
            bg="white"
            onClick={() => {
              onAddCart({ id, name, quantity: 1, price, imageUrl });
              setOpen(true);
            }}>
            <LuShoppingCart />
            Agregar al carrito {currentItem && `(${currentItem.quantity})`}
          </Button>
          <Link to={`/shop/${id}`} style={{ width: "90%" }}>
            <Button variant="outline" w="full" borderRadius="unset" color="white" _hover={{ bgColor: "brand.secondary/90", borderColor: "brand.secondary/90" }}>
              Ver producto
            </Button>
          </Link>
        </Flex>
      </Box>
      <Stack bgColor="#F4F5F7" p={13}>
        <Heading fontWeight="semibold" size={{ base: "sm", md: "lg" }} lineClamp={1}>{name}</Heading>
        <Text lineClamp={1} fontSize={13}>{description}</Text>
        <Flex align="center" justify="space-between">
          {discount && (
            <Text fontWeight="semibold">S/. {price - ((discount / 100) * price)}</Text>
          )}
          <Text color="fg.muted/80" fontWeight="semibold" textDecor={discount ? "line-through" : "none"}>
            S/. {price.toFixed(2)}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  )
}


export const ProductsGridSkeleton = () => {
  return (
    <Grid gap={21} templateColumns={{ base: "repeat(2,1fr)", lg: "repeat(4, 1fr)" }}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <Stack gap={0} minH="full" key={idx}>
          <Stack position="relative">
            <Box w="full">
              <Image
                src="https://fakeimg.pl/800x800/?text="
                objectFit="cover"
                display="block"
                w="100%"
                h="100%"
              />
            </Box>
            <Box
              position="absolute"
              w="full"
              h="full"
              bg="white"
            />
            <Skeleton
              variant="shine"
              borderRadius="unset"
              position="absolute"
              w="full"
              h="full"
            />
          </Stack>

          <Stack bgColor="#F4F5F7" p={13}>
            <SkeletonText variant="shine" noOfLines={1} h={8} />
            <SkeletonText variant="shine" noOfLines={1} w="60%" />
            <Flex align="center" justify="space-between">
              <SkeletonText
                variant="shine"
                w={55}
                lineClamp={1}
                noOfLines={1}
                color="fg.muted/80"
                fontWeight="semibold"
              />
            </Flex>
          </Stack>
        </Stack>
      ))}
    </Grid>
  )
}


export const ProductsGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  const hasNoResults = products.length === 0;

  return (
    <Grid gap={21} templateColumns={{ base: "repeat(2,1fr)", lg: "repeat(4, 1fr)" }}>
      {
        hasNoResults ? "No resutlts..." : (
          products.map((product) => (
            <ProductCard  {...product} key={product.id} />
          ))
        )
      }
    </Grid>
  )
}