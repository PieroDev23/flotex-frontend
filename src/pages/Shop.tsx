import { Stack } from "@chakra-ui/react"
import { useSearchParams } from "react-router"
import { ProductsGrid, ProductsGridSkeleton } from "../components/common/ProductsGrid"
import { useProducts } from "../hooks/api"
import { PageLayout } from "../layouts/PageLayout"

export default () => {
  const [searchParams] = useSearchParams();
  const params = {
    categoryId: searchParams.get("category") || "",
    name: searchParams.get("name") || ""
  };

  const { data: products, isLoading } = useProducts(params);
  return (
    <PageLayout title="Shop" showToolbar>
      <Stack gap={4}>
        {
          isLoading ?
            <ProductsGridSkeleton /> :
            <ProductsGrid products={products || []} />
        }
      </Stack>
    </PageLayout>
  )
}
