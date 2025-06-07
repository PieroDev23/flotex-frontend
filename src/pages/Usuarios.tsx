import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router";
import { User, UsersTable } from "../components/users/UsersTable";
import { useUsersList } from "../hooks/api";
import { Select } from "../components/common/Select";

export default () => {
  const [searchParams, setSearchParams] = useState<{
    role: string | null;
    active: string | null;
    search: string | null;
  }>({
    role: null,
    active: null,
    search: null
  });
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: users, isLoading } = useUsersList(searchParams);
  const navigate = useNavigate();

  const handleUserClick = (user: User) => {
    navigate(`/dashboard/usuarios/editar/${user.id}`);
  };

  const handleSearch = () => {
    setSearchParams(prev => ({
      ...prev,
      search: searchValue || null
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCreateUser = () => {
    navigate("/dashboard/usuarios/crear");
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    setSearchParams(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    setSearchParams(prev => ({
      ...prev,
      active: value
    }));
  };

  const roleOptions = [
    { label: "Administrador", value: "ADMIN" },
    { label: "Cliente", value: "CUSTOMER" }
  ];

  const statusOptions = [
    { label: "Activo", value: "ACTIVE" },
    { label: "Inactivo", value: "NOT_ACTIVE" }
  ];

  return (
    <Stack h="full" gap={6}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">Gestión de Usuarios</Heading>
        <Button
          colorScheme="blue"
          onClick={handleCreateUser}
        >
          Crear Usuario
        </Button>
      </Flex>

      <Stack gap={4}>
        <Flex gap={4}>
          <Box maxW="200px">
            <Select
              options={roleOptions}
              onChange={handleRoleChange}
              value={searchParams.role || ""}
              ref={null}
            />
          </Box>

          <Box maxW="200px">
            <Select
              options={statusOptions}
              onChange={handleStatusChange}
              value={searchParams.active || ""}
              ref={null}
            />
          </Box>
        </Flex>

        <InputGroup endElement={
          <Button
            position="absolute"
            right={0}
            top="0"
            size="md"
            zIndex={2}
            onClick={handleSearch}
          >
            <LuSearch />
          </Button>
        }>
          <Input
            placeholder="Buscar por nombre, apellido o email..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            pr="4.5rem"
          />
        </InputGroup>
      </Stack>
      <UsersTable
        users={users || []}
        isLoading={isLoading}
        onUserClick={handleUserClick}
      />
    </Stack>
  );
};
