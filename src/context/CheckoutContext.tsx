import React, { PropsWithChildren } from "react";
import { FormState, useForm, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useShop } from "./ShopContext";
import { useNavigate } from "react-router";
import { toaster } from "../chakra/components/ui/toaster";
import { useOrders } from "../hooks/api";

type FormValues = {
  firstname: string;
  lastname: string;
  country: string;
  address: string;
  shippingType: "SHIPPING" | "INHOUSE"
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

type CheckoutProviderValues = {
  step: number;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  formState: FormState<FormValues>;
  isMutating: boolean;
  shippingType: FormValues['shippingType'];
  setShippingType: (shippingType: FormValues['shippingType']) => void;
  setStep: (step: number) => void;
  handleSubmit: () => void;
}


export const CheckoutContext = React.createContext({} as CheckoutProviderValues);

export const useCheckout = () => {
  return React.useContext(CheckoutContext);
}

export const CheckoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [step, setStep] = React.useState(0);
  const { register, formState, handleSubmit, setValue } = useForm<FormValues>();
  const [shippingType, setShippingType] = React.useState<"SHIPPING" | "INHOUSE">("SHIPPING");
  const { cart, onDumpCart } = useShop();
  const navigate = useNavigate();

  const { createOrder } = useOrders();
  const { trigger, isMutating } = createOrder();

  const onSubmit = async (formValues: FormValues) => {
    if (step < 2) {
      setStep(prevStep => ++prevStep);
      return;
    }

    const { cardNumber, cvc, month, year, owner, ...rest } = formValues;
    const { products } = cart;
    const payload = { ...rest, totalAmount: cart.total, products }
    try {
      const result = await trigger(payload);
      onDumpCart();
      const { orderId } = result;
      navigate(`/order/${orderId}`);
    } catch {
      toaster.create({ type: "error", title: "No se pudo crear la orden." });
    }
  }

  return (
    <CheckoutContext.Provider value={{
      step,
      setStep,
      register,
      formState,
      isMutating,
      handleSubmit: handleSubmit(onSubmit),
      shippingType,
      setShippingType,
      setValue
    }}>
      {children}
    </CheckoutContext.Provider>
  )
}