import React, { PropsWithChildren } from "react";
import { FormState, useForm, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useNavigate } from "react-router";
import { toaster } from "../chakra/components/ui/toaster";
import { useAddress, useOrders } from "../hooks/api";
import { useAuth } from "./AuthContext";
import { useShop } from "./ShopContext";
import { FetchError } from "../fetcher";

type FormValues = {
  firstname: string;
  lastname: string;
  country: string;
  address: string;
  shippingType: "SHIPPING" | "INHOUSE"
  city: string;
  reference: string;
  addressId: string;
  phone: number;
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
  const { user } = useAuth();
  const [step, setStep] = React.useState(0);
  const [shippingType, setShippingType] = React.useState<"SHIPPING" | "INHOUSE">("SHIPPING");
  const { register, formState, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: {
      shippingType: "SHIPPING",
      address: "",
      country: "PE",
      city: "lima",
    }
  });
  const { cart, onDumpCart } = useShop();
  const navigate = useNavigate();

  const { createOrder } = useOrders();
  const { createAddress } = useAddress();
  const { trigger, isMutating } = createOrder();
  const { trigger: createAddressTrigger, isMutating: isCreatingAddress } = createAddress();

  React.useEffect(() => {
    if (user) {
      const { id, active, role, ...rest } = user;
      reset({ ...formState.defaultValues, ...rest });
    }
  }, [user]);

  const onSubmit = async (formValues: FormValues) => {
    if (
      !!user &&
      !formValues.addressId &&
      formValues.shippingType === "SHIPPING" &&
      step === 1
    ) {
      try {
        await createAddressTrigger({
          userId: user.id,
          address: formValues.address,
          reference: formValues.reference,
          country: formValues.country,
          city: formValues.city
        });
        toaster.create({
          type: "success",
          title: "Se ha creado su dirección",
          description: "Podrás usarla como una dirección predeterminada en tu siguiente compra."
        });
        setStep(2);
      } catch (error) {
        if (error instanceof FetchError) {
          toaster.create({
            type: "error",
            title: error.data.code,
            description: error.data.message
          })
        }
      }
      return;
    }

    if (step < 2) {
      setStep(prevStep => ++prevStep);
      return;
    }

    const { cardNumber, cvc, month, year, owner, ...rest } = formValues;
    const { products } = cart;
    const payload = { ...rest, totalAmount: cart.total, products, userId: user?.id }
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
      isMutating: isMutating || isCreatingAddress,
      handleSubmit: handleSubmit(onSubmit),
      shippingType,
      setShippingType,
      setValue,
    }}>
      {children}
    </CheckoutContext.Provider>
  )
}