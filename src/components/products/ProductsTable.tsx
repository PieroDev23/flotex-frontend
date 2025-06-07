import React from "react";
import { DataTable } from "../common/DataTable";
import { Badge, Image } from "@chakra-ui/react";
import { Product, Category } from "../../types";

interface ProductsTableProps {
  products: Product[];
  categories?: Category[];
  isLoading?: boolean;
  onProductClick?: (product: Product) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products = [],
  categories = [],
  isLoading = false,
  onProductClick
}) => {
  // Create a map for quick category lookup
  const categoryMap = React.useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {} as Record<string, string>);
  }, [categories]);

  const columns = [
    {
      header: "ID",
      accessor: "id",
      width: "80px"
    },
    {
      header: "Imagen",
      accessor: "imageUrl",
      width: "100px",
      cell: (value: string, row: Product) => (
        <Image 
          src={value} 
          alt={row.name}
          width="50px"
          height="50px"
          objectFit="cover"
          borderRadius="md"
        />
      )
    },
    {
      header: "Nombre",
      accessor: "name"
    },
    {
      header: "SKU",
      accessor: "sku",
      width: "120px"
    },
    {
      header: "Precio",
      accessor: "price",
      width: "100px",
      cell: (value: number) => `S/. ${value.toFixed(2)}`
    },
    {
      header: "Stock",
      accessor: "stock",
      width: "80px",
      cell: (value: number) => (
        <Badge colorScheme={value > 0 ? "green" : "red"}>
          {value}
        </Badge>
      )
    },
    {
      header: "Categoría",
      accessor: "categoryId",
      width: "120px",
      cell: (value: string) => categoryMap[value] || value
    },
    {
      header: "Estado",
      accessor: "stock",
      width: "100px",
      cell: (value: number) => (
        <Badge colorScheme={value > 0 ? "green" : "red"}>
          {value > 0 ? "Disponible" : "Agotado"}
        </Badge>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
      isLoading={isLoading}
      emptyMessage="No hay productos registrados"
      onRowClick={onProductClick}
    />
  );
};
