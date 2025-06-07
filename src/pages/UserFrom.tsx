import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { LuArrowLeft } from "react-icons/lu";
import { Field } from "../components/common/Field";
import { Select } from "../components/common/Select";
import { useGetUser, useUpdateUser, useUsersList, useRegister } from "../hooks/api";
import { FetchError } from "../fetcher";
import { toaster } from "../chakra/components/ui/toaster";
import { PasswordInput } from "../chakra/components/ui/password-input";
import { mutate } from "swr";

interface UserFormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: "ADMIN" | "CUSTOMER";
  active: "ACTIVE" | "NOT_ACTIVE";
  password?: string;
  confirmPassword?: string;
}

export default () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { data: user, isLoading, mutate: mutateUser } = useGetUser(Number(id), isEditMode);
  const { mutate: mutateUsersList } = useUsersList();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserFormData>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      role: "CUSTOMER",
      active: "ACTIVE",
      password: "",
      confirmPassword: ""
    }
  });
  
  const password = watch("password");
  const { trigger: updateUser, isMutating: isUpdating } = useUpdateUser(Number(id));
  const { trigger: registerUser, isMutating: isRegistering } = useRegister();

  React.useEffect(() => {
    if (user && isEditMode) {
      setValue("firstname", user.firstname);
      setValue("lastname", user.lastname);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("role", user.role);
      setValue("active", user.active);
    }
  }, [user, setValue, isEditMode]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEditMode) {
        // Modo edición: actualizar usuario existente
        const { confirmPassword, ...formData } = data;
        
        if (!formData.password) {
          delete formData.password;
        }
        
        const formattedData = {
          ...formData,
          phone: Number(data.phone)
        };

        const updatedUser = await updateUser(formattedData);
        
        mutateUser(updatedUser, false);
        mutate(`users/${id}`, updatedUser, false);
        
        toaster.create({
          title: "Usuario actualizado",
          description: "El usuario ha sido actualizado correctamente",
          type: "success",
          duration: 3000,
        });
      } else {
        // Modo creación: registrar nuevo usuario
        if (!data.password) {
          toaster.create({
            title: "Error",
            description: "La contraseña es obligatoria para crear un usuario",
            type: "error",
            duration: 5000,
          });
          return;
        }
        
        if (data.password !== data.confirmPassword) {
          toaster.create({
            title: "Error",
            description: "Las contraseñas no coinciden",
            type: "error",
            duration: 5000,
          });
          return;
        }
        
        await registerUser({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phone: Number(data.phone),
          password: data.password,
          role: data.role,
          active: data.active
        });
        
        toaster.create({
          title: "Usuario creado",
          description: "El usuario ha sido creado correctamente",
          type: "success",
          duration: 3000,
        });
      }
      
      // Actualizar la lista de usuarios y redirigir
      mutateUsersList();
      navigate("/dashboard/usuarios");
    } catch (error) {
      if (error instanceof FetchError) {
        toaster.create({
          title: error.data.code,
          description: error.data.message,
          type: "error",
          duration: 5000,
        });
      } else {
        toaster.create({
          title: "Error",
          description: `Ha ocurrido un error al ${isEditMode ? "actualizar" : "crear"} el usuario`,
          type: "error",
          duration: 5000,
        });
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("role", e.target.value as "ADMIN" | "CUSTOMER");
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("active", e.target.value as "ACTIVE" | "NOT_ACTIVE");
  };

  if (isLoading && isEditMode) {
    return (
      <Container centerContent py={10}>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack gap={6}>
        <Flex justify="space-between" align="center">
          <Link to="/dashboard/usuarios" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LuArrowLeft />
            Volver a la lista de usuarios
          </Link>
        </Flex>

        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Heading size="md" mb={6}>{isEditMode ? "Editar" : "Crear"} Usuario</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <Stack direction="row" gap={4}>
                <Field
                  label="Nombre"
                  required
                  invalid={!!errors.firstname}
                  errorText={errors.firstname?.message}
                >
                  <Input {...register("firstname", { required: "Este campo es requerido" })} />
                </Field>
                <Field
                  label="Apellido"
                  required
                  invalid={!!errors.lastname}
                  errorText={errors.lastname?.message}
                >
                  <Input {...register("lastname", { required: "Este campo es requerido" })} />
                </Field>
              </Stack>
              <Field
                label="Email"
                required
                invalid={!!errors.email}
                errorText={errors.email?.message}
              >
                <Input type="email" {...register("email", { required: "Este campo es requerido" })} />
              </Field>
              <Field
                label="Teléfono"
                required
                invalid={!!errors.phone}
                errorText={errors.phone?.message}
              >
                <Input type="number" {...register("phone", { required: "Este campo es requerido" })} />
              </Field>
              
              <Box borderTopWidth="1px" pt={4} mt={2}>
                <Text mb={4} fontWeight="medium">{isEditMode ? "Cambiar contraseña" : "Contraseña"}</Text>
                <Stack gap={4}>
                  <Field
                    label="Contraseña"
                    required={!isEditMode}
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                    helperText={isEditMode ? "Dejar en blanco para mantener la contraseña actual" : ""}
                  >
                    <PasswordInput {...register("password", { 
                      required: !isEditMode ? "Este campo es requerido" : false 
                    })} />
                  </Field>
                  
                  <Field
                    label="Confirmar contraseña"
                    required={!isEditMode}
                    invalid={!!errors.confirmPassword}
                    errorText={errors.confirmPassword?.message}
                  >
                    <PasswordInput 
                      {...register("confirmPassword", {
                        required: !isEditMode ? "Este campo es requerido" : false,
                        validate: value => 
                          !password || value === password || "Las contraseñas no coinciden"
                      })} 
                    />
                  </Field>
                </Stack>
              </Box>
              
              <Stack direction="row" gap={4}>
                <Field label="Rol">
                  <Select
                    {...register("role")}
                    onChange={handleRoleChange}
                    options={[
                      { label: "Administrador", value: "ADMIN" },
                      { label: "Cliente", value: "CUSTOMER" }
                    ]}
                  />
                </Field>
                <Field label="Estado">
                  <Select
                    {...register("active")}
                    onChange={handleStatusChange}
                    options={[
                      { label: "Activo", value: "ACTIVE" },
                      { label: "Inactivo", value: "NOT_ACTIVE" }
                    ]}
                  />
                </Field>
              </Stack>

              <Flex justify="flex-end" mt={4}>
                <Button variant="ghost" mr={3} asChild>
                  <Link to="/dashboard/usuarios">
                    Cancelar
                  </Link>
                </Button>
                <Button 
                  type="submit" 
                  colorScheme="blue" 
                  loading={isUpdating || isRegistering}
                >
                  {isEditMode ? "Actualizar" : "Crear"}
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};
