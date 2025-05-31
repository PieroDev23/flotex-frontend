import { Button, Container, Flex, useCheckboxGroup } from "@chakra-ui/react";
import React from "react";
import { LuListRestart } from "react-icons/lu";
import { CategoriesMenu } from "./CategoriesMenu";
import { PriceSortMenu } from "./PriceMenu";
import { SearchBar } from "./SearchBar";

export const Toolbar: React.FC = () => {

  const [priceSort, setPriceSort] = React.useState("");
  const group = useCheckboxGroup({ defaultValue: [] });

  const onResetFilters = () => {
    setPriceSort("");
    group.setValue([]);
  }

  return (
    <Flex bgColor="yellow.400/10" minH={100}>
      <Container as={Flex} alignItems="center" justifyContent="space-between" gap="3">
        <SearchBar />
        <Flex>
          <PriceSortMenu value={priceSort} onChange={setPriceSort} />
          <CategoriesMenu group={group} />
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
