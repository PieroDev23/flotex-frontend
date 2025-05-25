import { Flex, Input, Stack, Textarea } from "@chakra-ui/react"
import { useCheckout } from "../../context/CheckoutContext"
import { Field } from "../common/Field"
import { Select } from "../common/Select"




export const ShippingInformation = () => {
  const { formState, register } = useCheckout();
  return (
    <Stack gap={21} p={21}>
      <Stack gap={21}>
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
        <Field
          label="Información adicional"
          helperText="Detalla cualquier información relevante acerca de tu pedido">
          <Textarea rows={8} resize="none" {...register("detail")} />
        </Field>
      </Stack>
    </Stack>
  )
}