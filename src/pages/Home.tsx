import { Container, Stack } from "@chakra-ui/react";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { Hero } from "../components/common/Hero";
import { ShowcaseSection } from "../components/home/ShowcaseSection";
import { SocialmediaSection } from "../components/home/SocialmediaSection";
import { ProductsSection } from "../components/home/ProductsSection";



export default () => {
  return (
    <Stack gap={55}>
      <Hero />
      <Container as={Stack} gap={55}>
        <ProductsSection />
        <CategoriesSection />
      </Container>
      <ShowcaseSection />
      <SocialmediaSection />
    </Stack>
  )
};