import { useSearchParams } from "react-router"
import { ProductsGrid, ProductsGridSkeleton } from "../components/common/ProductsGrid"
import { useProducts } from "../hooks/api"
import { PageLayout } from "../layouts/PageLayout"



export default () => {
  const [searchParams] = useSearchParams();
  const params = { categoryId: searchParams.get("category") };
  const { data: products, isLoading } = useProducts(params);

  return (
    <PageLayout title="Shop">
      {
        isLoading ?
          <ProductsGridSkeleton /> :
          <ProductsGrid products={products} />
      }
    </PageLayout>
  )
}