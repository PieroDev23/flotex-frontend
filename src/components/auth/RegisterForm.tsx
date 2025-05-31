import { Button, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { Field } from "../common/Field"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { PasswordInput } from "../../chakra/components/ui/password-input"
import { useRegister } from "../../hooks/api"
import { FetchError } from "../../fetcher"
import { toaster } from "../../chakra/components/ui/toaster"
import { useAuth } from "../../context/AuthContext"

type FormValues = {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  password: string,
  repeatPassword: string
}
export const RegisterForm = () => {
  const { register, formState, watch, handleSubmit } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: ""
    }
  });
  const password = watch("password");
  const { isMutating, trigger } = useRegister();
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async ({
    email,
    firstname,
    lastname,
    password,
    phone,
  }: FormValues) => {
    try {
      await trigger({
        firstname,
        lastname,
        password,
        email,
        phone: Number(phone)
      });
      refreshUser();
      navigate("/");
    } catch (error) {
      if (error instanceof FetchError) {
        toaster.create({
          type: "error",
          title: error.data.code,
          description: error.data.message
        });
      }
    }
  }

  return (
    <Stack
      as="form"
      gap={34}
      width="100%"
      minW="500px"
      shadow="xs"
      borderRadius="md"
      border="1px solid {gray/20}"
      padding={5}
      bgColor="white"
      height="fit"
      mt={144}
      onSubmit={handleSubmit(onSubmit)}
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
          <PasswordInput placeholder="Ingresa tu contraseña"  {...register("password")} />
        </Field>
        <Field
          label="Repite contraseña"
          required
          invalid={!!formState.errors.repeatPassword}
          errorText={formState.errors.repeatPassword?.message}
        >
          <PasswordInput
            placeholder="Repite tu contraseña"
            {...register("repeatPassword", {
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
        </Field>
        <Text fontSize="sm">Ya tienes una cuenta? <Link to="/login"
          style={{ textDecoration: "underline", fontWeight: "semibold" }}> Ingresa aquí</Link></Text>
      </Stack>
      <Button loading={isMutating} type="submit">Crear cuenta</Button>
    </Stack>
  )
}