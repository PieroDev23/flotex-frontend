import { Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { LuArrowLeft } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { toaster } from "../chakra/components/ui/toaster";
import { BillingDetails } from "../components/checkout/BillingDetails";
import { CheckoutReview } from "../components/checkout/CheckoutReview";
import { PaymentMethodStep } from "../components/checkout/PaymentMethod";
import { useShop } from "../context/ShopContext";
import { useOrders } from "../hooks/api";
import { PageLayout } from "../layouts/PageLayout";


export type FormValues = {
  firstname: string;
  lastname: string;
  country: string;
  address: string;
  city: string;
  reference: string;
  phone: string;
  email: string;
  detail: string;
  cardNumber: string;
  month: string;
  year: string;
  cvc: string;
  owner: string;
}

export default () => {
  const [step, setStep] = React.useState(0);

  const { register, formState, handleSubmit } = useForm<FormValues>(
    {
      defaultValues: {
        firstname: "",
        lastname: "",
        country: "PE",
        city: "lima",
        address: "",
        reference: "",
        phone: "",
        email: "",
        detail: "",
        cardNumber: "",
        month: "",
        year: "2025",
        cvc: "123",
        owner: ""
      }
    })

  const { cart } = useShop();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const { trigger, isMutating } = createOrder();

  const onSubmit = async (formValues: FormValues) => {
    if (step === 0) return setStep(1);
    const { cardNumber, cvc, month, year, owner, ...rest } = formValues;
    const { products } = cart;
    const payload = { ...rest, totalAmount: cart.total, products }
    try {
      const result = await trigger(payload);
      console.log("ok go");
      const { orderId } = result;
      navigate(`/order/${orderId}`);
    } catch {
      toaster.create({ type: "error", title: "No se pudo crear la orden." });
    }
  }

  return (
    <PageLayout title="Checkout">
      <Link
        to={step === 0 ? "/shop" : ""}
        onClick={() => step === 1 ? setStep(0) : null}
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontSize: 13,
          gap: 8,
          textDecoration: "underline",
          marginBottom: 31
        }}>
        <LuArrowLeft />
        {step === 1 ? "Datos de facturación" : "Tienda"}
      </Link>
      {cart.products.length === 0 ? (
        <Heading>No tienes ningún producto...</Heading>
      ) : (
        <Grid
          gap={55}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {
            step === 0 ?
              <BillingDetails
                register={register}
                formState={formState}
              /> : <PaymentMethodStep
                register={register}
                formState={formState}
              />
          }
          <CheckoutReview step={step} isLoading={isMutating} />
        </Grid>)}
    </PageLayout>
  )
}