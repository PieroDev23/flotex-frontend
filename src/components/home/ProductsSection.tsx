
import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";
import { useProducts } from "../../hooks/api";
import { ProductsGrid, ProductsGridSkeleton } from "../common/ProductsGrid";
import { Section } from "../common/Section";

export const ProductsSection: React.FC = () => {
  const { data: products, isLoading } = useProducts();

  return (
    <Section
      title="Nuestros productos"
      description="Puedes explorar más en la tienda"
    >
      <Stack gap={55}>
        {
          isLoading ?
            <ProductsGridSkeleton /> :
            <ProductsGrid products={products} />
        }
        <Link to="/shop" style={{ width: "fit-content", display: "inline-block", margin: "auto" }}>
          <Button
            border="1px solid black"
            m="auto"
            maxW="fit"
            size="2xl"
            variant="outline"
            borderRadius="unset"
          >
            Explorar en Tienda
          </Button>
        </Link>
      </Stack>
    </Section>
  )
}