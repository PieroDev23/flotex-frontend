import { Flex, Heading, Input, Stack, Textarea } from "@chakra-ui/react"
import { Field } from "../common/Field"
import { Select } from "../common/Select"
import { FormState, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../pages/Checkout";


const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const BillingDetails: React.FC<{
  register: UseFormRegister<FormValues>,
  formState: FormState<FormValues>
}> = ({ formState, register }) => {
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
        <Flex gap={5}>
          <Field label="País" required disabled>
            <Select
              {...register("country")}
              options={[{ label: "Perú", value: "PE" }]}
            />
          </Field>
          <Field label="Ciudad" required disabled>
            <Select
              {...register("city")}
              options={[{ label: "Lima", value: "lima" }]}
            />
          </Field>
        </Flex>
        <Field
          label="Diección"
          required
          invalid={!!formState.errors.address}
          errorText={formState.errors.address?.message}
          helperText="Mínimo 10 caracteres">
          <Input {...register("address", { minLength: { value: 10, message: "Dirección no válida" } })} />
        </Field>
        <Field
          label="Referencia"
          helperText="La referencia nos ayudará a encontrarte más rápido">
          <Input {...register("reference")} />
        </Field>
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
        <Field
          label="Información adicional"
          helperText="Detalla cualquier información relevante acerca de tu pedido">
          <Textarea rows={8} resize="none" {...register("detail")} />
        </Field>
      </Stack>
    </Stack>
  )
}