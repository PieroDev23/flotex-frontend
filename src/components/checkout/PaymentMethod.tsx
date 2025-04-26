import { Flex, Heading, Input, Stack } from "@chakra-ui/react"
import { FormState, UseFormRegister } from "react-hook-form"
import { FormValues } from "../../pages/Checkout"
import { Field } from "../common/Field"
import { Select } from "../common/Select"





const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"
]

const makeYears = () => {
  const years = [];
  for (let y = new Date().getFullYear() + 1; y <= 2038; y++) {
    years.push(y);
  }
  return years;
}

export const PaymentMethodStep = ({ register, formState }: {
  register: UseFormRegister<FormValues>,
  formState: FormState<FormValues>
}) => {
  return (
    <Stack gap={21}>
      <Heading size="2xl">Datos de pago</Heading>
      <Stack gap={21}>
        <Field label="Número de tarjeta" required>
          <Input {...register("cardNumber", { maxLength: 16 })} maxLength={16} />
        </Field>
        <Flex align="center" gap={5} flexWrap={{ base: "wrap", md: "nowrap" }}>
          <Flex align="center" gap={2} flexBasis={{ base: "full", md: "90%" }}>
            <Field label="Mes" required>
              <Select
                options={months.map((m => ({ label: m, value: m })))}
                {...register("month")}
              />
            </Field>
            <Field label="Año" required>
              <Select options={
                makeYears()
                  .map(y => ({ label: y.toString(), value: y.toString() }))}
                {...register("year")}
              />
            </Field>
          </Flex>
          <Field
            label="CVC"
            flexBasis={{ base: "full", md: "10%" }}
            required
            invalid={!!formState.errors.cvc}
            errorText="cvc no válido"
          >
            <Input
              {...register("cvc", { maxLength: 4, minLength: 3 })}
              maxLength={4}
              minLength={3}
            />
          </Field>
        </Flex>
        <Field label="Propietario" required>
          <Input min={3} />
        </Field>
      </Stack>
    </Stack>
  )
}