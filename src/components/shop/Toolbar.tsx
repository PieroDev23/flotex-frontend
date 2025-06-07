import { Button, Container, Flex } from "@chakra-ui/react";
import React from "react";
import { LuListRestart } from "react-icons/lu";
import { CategoriesMenu } from "./CategoriesMenu";
import { PriceSortMenu } from "./PriceMenu";
import { SearchBar } from "./SearchBar";
import { useSearchParams } from "react-router";

export const Toolbar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onResetFilters = () => {
    setSearchParams(prev => {
      prev.delete("priceSort");
      prev.delete("category");
      prev.delete("name");
      return prev
    });
  }

  return (
    <Flex bgColor="yellow.400/10" minH={100}>
      <Container as={Flex} alignItems="center" justifyContent="space-between" gap="3">
        <SearchBar />
        <Flex>
          <PriceSortMenu value={searchParams.get("priceSort") || ""} onChange={(value) => {
            setSearchParams(prev => {
              prev.set("priceSort", value);
              return prev;
            });
          }} />
          <CategoriesMenu value={searchParams.get("category") || ""} onChange={(value) => {
            setSearchParams(prev => {
              prev.set("category", value);
              return prev;
            });
          }} />
          <Button variant="ghost" _hover={{
            bgColor: "brand.primary",
            color: "white"
          }}
            onClick={onResetFilters}
          >
            <LuListRestart />
            Reiniciar filtros
          </Button>
        </Flex>
      </Container>
    </Flex>
  )
}
