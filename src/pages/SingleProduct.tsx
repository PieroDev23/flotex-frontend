import { Box, Button, Container, Flex, Grid, HStack, IconButton, Image, NumberInput, RatingGroup, Separator, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { Link, useParams } from "react-router";
import { CustomAlert } from "../components/common/Alert";
import { ProductsGrid, ProductsGridSkeleton } from "../components/common/ProductsGrid";
import { QualityAssurance } from "../components/common/QualityAssuarance";
import { Section } from "../components/common/Section";
import { Navbar } from "../components/shop/SingleProduct/NavBar";
import { ProductDetail } from "../components/shop/SingleProduct/ProductDetail";
import { useShop } from "../context/ShopContext";
import { useProduct, useProducts } from "../hooks/api";


export const ProductDetailSkeleton = () => {
  return (
    <Stack gap={55}>
      <Container>
        <Skeleton minH={55} mb={21} />
        <Grid templateColumns={
          { base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }
        }
          gap={55}
          minH={600}
        >
          <Skeleton />
          <Stack gap={5}>
            <Stack gap={5}>
              <SkeletonText minH={34} w="80%" noOfLines={1} />
              <SkeletonText minH={21} w="50%" noOfLines={1} />
              <Flex align="center" gap={13}>
                <RatingGroup.Root readOnly count={5} defaultValue={0} size="md" colorPalette="yellow">
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>
                <Separator orientation="vertical" height={8} />
                <SkeletonText noOfLines={1} w={244} />
              </Flex>
            </Stack>
            <Stack gap={5}>
              <SkeletonText />
              <Flex align="center" gap={21}>
                <NumberInput.Root defaultValue="0"
                  unstyled
                  max={0}
                  spinOnPress={false}
                  min={0}
                >
                  <HStack gap="2">
                    <NumberInput.DecrementTrigger asChild disabled>
                      <IconButton variant="outline" size="sm" borderRadius="unset" disabled>
                        <LuMinus />
                      </IconButton>
                    </NumberInput.DecrementTrigger>
                    <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                    <NumberInput.IncrementTrigger asChild disabled>
                      <IconButton variant="outline" size="sm" borderRadius="unset">
                        <LuPlus />
                      </IconButton>
                    </NumberInput.IncrementTrigger>
                  </HStack>
                </NumberInput.Root>
                <Button
                  disabled
                  size="xl"
                  borderRadius="unset">
                  Añadir al carrito
                </Button>
              </Flex>
            </Stack>
            <Separator mt={23} />
            <Stack gap={5}>
              <SkeletonText noOfLines={1} w={144} />
              <SkeletonText noOfLines={1} w={144} />
              <SkeletonText noOfLines={1} w={144} />
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </Stack>
  )
}


export default () => {

  const { id } = useParams();
  const { cart, setOpen } = useShop();
  const { data: product } = useProduct(Number(id));
  const { data: products } = useProducts({ categoryId: product?.categoryId }, !!product);

  const currentProduct = cart.products.find(i => i.id === Number(id));

  return (
    <Stack gap={55}>
      <Navbar />
      {
        !product ?
          <ProductDetailSkeleton /> :
          <Container>
            {
              currentProduct && (
                <CustomAlert status="info" title="Cuentas con este producto en tu carrito:">
                  Actualmente {currentProduct.quantity} en el <Link
                    to=""
                    onClick={() => setOpen(true)}
                    style={{ textDecoration: "underline" }}
                  >carrito</Link>
                </CustomAlert>
              )
            }
            <Grid templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)"
            }} gap={55} minH={600}>
              <Box bgColor="yellow.400/10" maxH={{ md: 472, xl: "full" }}>
                <Image src={product?.imageUrl} objectFit="cover" w="full" h="full" display="block" />
              </Box>
              {product && <ProductDetail product={product} />}
            </Grid>
          </Container>
      }
      <Separator />
      <Section title="Productos relacionados" description="Sigue explorando">
        <Container>
          {!products ? <ProductsGridSkeleton /> : <ProductsGrid products={products} />}
        </Container>
      </Section>
      <QualityAssurance />
    </Stack >
  )

}