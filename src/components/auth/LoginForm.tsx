import { Button, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { Field } from "../common/Field"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useLogin } from "../../hooks/api"
import { toaster } from "../../chakra/components/ui/toaster"
import { FetchError } from "../../fetcher"
import { useAuth } from "../../context/AuthContext"



export const LoginForm = () => {
  const { formState, register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const { trigger, isMutating } = useLogin();
  const onSubmit = async (formValues: { email: string, password: string }) => {
    try {
      await trigger({
        email: formValues.email,
        password: formValues.password
      });
      refreshUser();
      navigate("/");
    } catch (error) {
      if (error instanceof FetchError) {
        toaster.create({
          title: error.data.code,
          closable: true,
          description: error.data.message,
          type: "error"
        });
      }
    }
  }
  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
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
    >
      <Heading textAlign="center">Ingresar a flotex</Heading>
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
      <Button type="submit" loading={isMutating}>Ingresar</Button>
    </Stack>
  )
}