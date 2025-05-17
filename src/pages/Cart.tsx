import { Grid, Heading, Stack } from "@chakra-ui/react"
import { LuArrowLeft } from "react-icons/lu"
import { Link } from "react-router"
import { CartReview } from "../components/cart/CartReview"
import { CartTable } from "../components/cart/CartTable"
import { useShop } from "../context/ShopContext"
import { PageLayout } from "../layouts/PageLayout"
import { ProductsGrid, ProductsGridSkeleton } from "../components/common/ProductsGrid"
import { useProducts } from "../hooks/api"


export default () => {
  const { cart } = useShop();
  const { data: products, isLoading } = useProducts();

  return (
    <PageLayout title="Carrito">
      <Stack gap={55}>
        <Link to="/shop" style={{ textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: 8, width: "fit-content", fontSize: 13 }}>
          <LuArrowLeft />
          Regresar
        </Link>
        {cart.products.length === 0 ? (
          "No hay productos en el carrito"
        )
          : (
            <>
              <Grid gridTemplateColumns="repeat(2, 1fr)" gap={8}>
                <CartTable />
                <CartReview />
              </Grid>
              <Stack gap={13}>
                <Heading textAlign="center" textTransform="uppercase">Compra mas</Heading>
                {isLoading ? <ProductsGridSkeleton /> :
                  <ProductsGrid products={products.slice(0, 8)} />}
              </Stack>
            </>
          )}
      </Stack>
    </PageLayout>
  )
}