import { Link as ChakraLink, Container, Grid, Stack } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router";
import { BillingDetails } from "../components/checkout/BillingDetails";
import { CheckoutReview } from "../components/checkout/CheckoutReview";
import { PaymentMethodStep } from "../components/checkout/PaymentMethod";
import { ShippingType } from "../components/checkout/ShippingType";
import { StepperCheckout } from "../components/checkout/StepperCheckout";
import { useCheckout } from "../context/CheckoutContext";
import { useShop } from "../context/ShopContext";
import { PageLayout } from "../layouts/PageLayout";




const STEPS_VIEWS = {
  0: <BillingDetails />,
  1: <ShippingType />,
  2: <PaymentMethodStep />
}

export default () => {
  const { step, handleSubmit } = useCheckout();
  const { cart } = useShop();

  return (
    <PageLayout title="Checkout">
      <Stack gap="16">
        <ChakraLink asChild textDecor="underline" textStyle="sm" mb="5" display="inline-flex">
          <Link to="/shop" style={{ maxWidth: "fit-content" }}>
            <LuArrowLeft />
            Volver a la tienda
          </Link>
        </ChakraLink>
        <Container maxW="1100px">
          <StepperCheckout />
        </Container>
        <Grid
          onSubmit={handleSubmit}
          gap={55}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          as="form"
        >
          {
            cart.products.length > 0 ?
              (
                <>
                  {STEPS_VIEWS[step as keyof typeof STEPS_VIEWS]}
                  < CheckoutReview />
                </>
              )
              : "No tienes productos..."
          }
        </Grid>
      </Stack>
    </PageLayout>
  )
}