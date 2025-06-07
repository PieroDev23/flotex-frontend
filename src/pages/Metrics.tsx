import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

export default () => {
  const { user } = useAuth();
  return (
    <Container maxW="container.xl" py={8}>
      <Stack gap={6}>
        <Heading size="xl">Panel de Administración</Heading>
        <Box p={6} borderWidth="1px" borderRadius="lg">
          <Stack gap={4}>
            <Heading size="md">Información del Administrador</Heading>
            <Text>Nombre: {user?.firstname} {user?.lastname}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Teléfono: {user?.phone}</Text>
            <Text>Rol: {user?.role}</Text>
            <Text>Estado: {user?.active}</Text>
          </Stack>
        </Box>

        {/* Aquí puedes agregar más secciones para la gestión administrativa */}
        <Box p={6} borderWidth="1px" borderRadius="lg">
          <Heading size="md">Funcionalidades de Administración</Heading>
          <Text mt={4}>El contenido del panel de administración estará disponible próximamente.</Text>
        </Box>
      </Stack>
    </Container>
  );
};