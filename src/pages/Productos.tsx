import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router";
import { ProductsTable } from "../components/products/ProductsTable";
import { useProductsList, useCategories } from "../hooks/api";
import { Select } from "../components/common/Select";
import { Product, ProductSearchParams, SelectOption, Category } from "../types";

export default () => {
  const [searchParams, setSearchParams] = useState<ProductSearchParams>({
    categoryId: null,
    search: null,
    stockStatus: null
  });
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: products, isLoading } = useProductsList(searchParams);
  const { data: categories } = useCategories();
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/dashboard/productos/editar/${product.id}`);
  };

  const handleSearch = () => {
    setSearchParams(prev => ({
      ...prev,
      search: searchValue || null
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCreateProduct = () => {
    navigate("/dashboard/productos/crear");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    setSearchParams(prev => ({
      ...prev,
      categoryId: value
    }));
  };

  const handleStockStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    setSearchParams(prev => ({
      ...prev,
      stockStatus: value
    }));
  };

  // Filter products by stock status if needed
  const filteredProducts = products?.filter((product: Product) => {
    if (!searchParams.stockStatus) return true;
    if (searchParams.stockStatus === "available") return product.stock > 0;
    if (searchParams.stockStatus === "out_of_stock") return product.stock === 0;
    return true;
  }) || [];

  const categoryOptions: SelectOption[] = [
    { label: "Todas las categorías", value: "" },
    ...(categories?.map((category: Category) => ({
      label: category.name,
      value: category.id
    })) || [])
  ];

  const stockStatusOptions: SelectOption[] = [
    { label: "Todos los estados", value: "" },
    { label: "Disponible", value: "available" },
    { label: "Agotado", value: "out_of_stock" }
  ];

  return (
    <Stack h="full" gap={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">Gestión de Productos</Heading>
        <Button
          colorScheme="blue"
          onClick={handleCreateProduct}
        >
          Crear Producto
        </Button>
      </Flex>

      <Stack gap={4}>
        <Flex gap={4}>
          <Box maxW="200px">
            <Select
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={searchParams.categoryId || ""}
              ref={null}
            />
          </Box>

          <Box maxW="200px">
            <Select
              options={stockStatusOptions}
              onChange={handleStockStatusChange}
              value={searchParams.stockStatus || ""}
              ref={null}
            />
          </Box>
        </Flex>

        <InputGroup endElement={
          <Button
            position="absolute"
            right={0}
            top="0"
            size="md"
            zIndex={2}
            onClick={handleSearch}
          >
            <LuSearch />
          </Button>
        }>
          <Input
            placeholder="Buscar por nombre o SKU..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            pr="4.5rem"
          />
        </InputGroup>
      </Stack>
      <ProductsTable
        products={filteredProducts}
        categories={categories}
        isLoading={isLoading}
        onProductClick={handleProductClick}
      />
    </Stack>
  );
};