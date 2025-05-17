import { Button, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { Field } from "../common/Field"
import { Link } from "react-router"
import { useForm } from "react-hook-form"


export const RegisterForm = () => {
  const { register, formState, watch } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: ""
    }
  });

  const repeatPassword = watch("repeatPassword");

  return (
    <Stack
      gap={34}
      width="500px"
      shadow="sm"
      border="1px"
      padding={5}
      bgColor="white"
      height="fit"
      mt={144}
    >
      <Heading textAlign="center">Crea tu Cuenta</Heading>
      <Stack gap={5}>
        <Flex align="center" gap={3}>
          <Field label="Nombres" required invalid={!!formState.errors.firstname}>
            <Input placeholder="Ingresa tus nombres" {...register("firstname")} />
          </Field>
          <Field label="Apellidos" required invalid={!!formState.errors.lastname}>
            <Input placeholder="Ingresa tus apellidos" {...register("lastname")} />
          </Field>
        </Flex>
        <Field label="Email" required invalid={!!formState.errors.email}>
          <Input placeholder="Ingresa tu correo" {...register("email")} />
        </Field>
        <Field label="Teléfono" required invalid={!!formState.errors.phone}>
          <Input type="text" placeholder="Ingresa tu télefono" {...register("phone")} />
        </Field>
        <Field label="Password" required invalid={!!formState.errors.password}>
          <Input type="password" placeholder="Ingresa tu contraseña"  {...register("password")} />
        </Field>
        <Field label="Repite contraseña" required>
          <Input type="password" placeholder="Repite tu contraseña" />
        </Field>
        <Text fontSize="sm">Ya tienes una cuenta? <Link to="/login"
          style={{ textDecoration: "underline", fontWeight: "semibold" }}> Ingresa aquí</Link></Text>
      </Stack>
      <Button>Crear cuenta</Button>
    </Stack>
  )
}