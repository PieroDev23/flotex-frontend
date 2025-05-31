import { Checkbox, Flex, Input, Stack, Text, Textarea } from "@chakra-ui/react"
import { useCheckout } from "../../context/CheckoutContext"
import { Field } from "../common/Field"
import { Select } from "../common/Select"
import React from "react"
import { useAuth } from "../../context/AuthContext"
import { useAddress } from "../../hooks/api"




export const ShippingInformation = () => {
  const [checked, setChecked] = React.useState(false);
  const { formState, register, setValue } = useCheckout();
  const { user } = useAuth();
  // const { data: addresses } = useGetAddress(checked);
  const { getAddresses } = useAddress();
  const { data: addresses } = getAddresses(checked && !!user);
  return (
    <Stack gap={21} p={21}>
      {user && (
        <Checkbox.Root checked={checked} onCheckedChange={e => setChecked(Boolean(e.checked))}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Quiero escoger una dirección predeterminada</Checkbox.Label>
        </Checkbox.Root>)}
      {addresses ? (
        <Field
          label="Selecciona tu dirección"
          required
        >
          <Select
            options={
              addresses.map(({ address, id }: Record<string, unknown>) => ({
                label: address,
                value: id
              }))
            }
            onChange={(e) => setValue("addressId", e.target.value)}
          />
        </Field>) : <Text hidden={!checked}>No tienes ninguna dirección guardada.</Text>}
      <Stack gap={21} hidden={checked}>
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
          required={!checked}
          invalid={!!formState.errors.address}
          errorText={formState.errors.address?.message}
          helperText="Mínimo 10 caracteres">
          <Input {...register("address", { minLength: { value: 10, message: "Dirección no válida" } })} />
        </Field>
        <Field
          label="Referencia"
          helperText="La referencia nos ayudará a encontrarte más rápido">
          <Input {...register("reference")} disabled={checked} />
        </Field>
        <Field
          label="Información adicional"
          helperText="Detalla cualquier información relevante acerca de tu pedido">
          <Textarea rows={8} resize="none" {...register("detail")} disabled={checked} />
        </Field>
      </Stack>
    </Stack >
  )
}