import { Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useCheckout } from "../../context/CheckoutContext";
import { Field } from "../common/Field";



const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const BillingDetails: React.FC = () => {
  const { register, formState } = useCheckout();
  return (
    <Stack gap={21} p={21}>
      <Heading size="2xl">Datos de Facturación</Heading>
      <Stack gap={21}>
        <Flex gap={5}>
          <Field
            label="Nombres"
            required
            invalid={!!formState.errors.firstname}
            errorText={formState.errors.firstname?.message}
          >
            <Input {...register("firstname", { minLength: { value: 2, message: "Nombres no válidos" } })} />
          </Field>
          <Field
            label="Apellidos"
            required
            invalid={!!formState.errors.lastname}
            errorText={formState.errors.lastname?.message}
          >
            <Input {...register("lastname", { minLength: { value: 2, message: "Apellidos no válidos" } })} />
          </Field>
        </Flex>
        <Field label="Teléfono" required>
          <Input type="tel" {...register("phone")} />
        </Field>
        <Field
          label="Email"
          required
          invalid={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        >
          <Input type="email" {...register("email", { pattern: { value: EMAIL_REGEX, message: "Email no válido" } })} />
        </Field>
      </Stack>
    </Stack>
  )
}