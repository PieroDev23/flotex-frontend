import { Stack, Steps } from "@chakra-ui/react"
import React from "react"
import { LuCheck, LuTruck, LuUser, LuWallet } from "react-icons/lu"
import { useCheckout } from "../../context/CheckoutContext";




export const StepperCheckout: React.FC = () => {
  const { setStep, step } = useCheckout();
  return (
    <Steps.Root
      step={step}
      onStepChange={({ step }) => setStep(step)}
    >
      <Steps.List>
        <Steps.Item index={0} >
          <Steps.Indicator
            _complete={{ bgColor: "brand.primary" }}
            _incomplete={{ borderColor: "brand.primary" }}
          >
            <Steps.Status incomplete={<LuUser />} complete={<LuCheck />} />
          </Steps.Indicator>
          <Stack gap="0" display={{ base: "none", md: "flex" }}>
            <Steps.Title>
              Datos personales
            </Steps.Title>
            <Steps.Description textStyle="xs">
              Ingresa tus datos personales.
            </Steps.Description>
          </Stack>
          <Steps.Separator />
        </Steps.Item>
        <Steps.Item index={1}>
          <Steps.Indicator
            _complete={{ bgColor: "brand.primary" }}
            _incomplete={{ borderColor: "brand.primary" }}
          >
            <Steps.Status incomplete={<LuTruck />} complete={<LuCheck />} />
          </Steps.Indicator>
          <Stack gap="0" display={{ base: "none", md: "flex" }}>
            <Steps.Title>
              Método de entrega
            </Steps.Title>
            <Steps.Description textStyle="xs">
              Elige el método de entrega.
            </Steps.Description>
          </Stack>
          <Steps.Separator />
        </Steps.Item>
        <Steps.Item index={2}>
          <Steps.Indicator
            _complete={{ bgColor: "brand.primary" }}
            _incomplete={{ borderColor: "brand.primary" }}
          >
            <Steps.Status incomplete={<LuWallet />} complete={<LuCheck />} />
          </Steps.Indicator>
          <Stack gap="0" display={{ base: "none", md: "flex" }}>
            <Steps.Title>
              Método de pago
            </Steps.Title>
            <Steps.Description textStyle="xs">
              Paga seguro.
            </Steps.Description>
          </Stack>
          <Steps.Separator />
        </Steps.Item>
      </Steps.List>
    </Steps.Root>
  )
}