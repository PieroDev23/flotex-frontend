import { Button, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { Field } from "../common/Field"
import { Link } from "react-router"
import { useForm } from "react-hook-form"



export const LoginForm = () => {
  const { formState, register } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  return (
    <Stack
      gap={34}
      width="100%" minW="500px" shadow="sm" border="1px" padding={5} bgColor="white" height="fit" mt={144}>
      <Heading textAlign="center">Ingresa</Heading>
      <Stack gap={5}>
        <Field label="Email" required invalid={!!formState.errors.email}>
          <Input placeholder="ingresa tu correo" {...register("email")} />
        </Field>
        <Field label="Password" required invalid={!!formState.errors.email}>
          <Input type="password" placeholder="ingresa tu contraseña" {...register("password")} />
        </Field>
        <Text fontSize="sm">No tienes cuenta? <Link to="/register"
          style={{ textDecoration: "underline", fontWeight: "semibold" }}>
          Crea una cuenta</Link>
        </Text>
      </Stack>
      <Button>Ingresar</Button>
    </Stack>
  )
}