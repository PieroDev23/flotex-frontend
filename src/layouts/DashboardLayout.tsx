import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  LuChartArea,
  LuHouse,
  LuLogOut,
  LuPackage,
  LuShoppingBag,
  LuUsers,
} from "react-icons/lu";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { withAuth } from "../with-auth";

interface MenuItem {
  label: string;
  to: string;
  icon?: ReactNode;
}

// Array simplificado de items de menú
const menuItems: MenuItem[] = [
  {
    label: "Inicio",
    to: "/dashboard",
    icon: <LuHouse />,
  },
  {
    label: "Usuarios",
    to: "/dashboard/usuarios",
    icon: <LuUsers />,
  },
  {
    label: "Productos",
    to: "/dashboard/productos",
    icon: <LuPackage />,
  },
  {
    label: "Métricas",
    to: "/dashboard/metricas",
    icon: <LuChartArea />,
  },
  // {
  //   label: "Configuración",
  //   to: "/configuracion",
  //   icon: <LuSettings />,
  // },
];

export const Sidebar = () => {
  const location = useLocation();

  const { onLogout } = useAuth();

  return (
    <Flex
      as="nav"
      direction="column"
      justifyContent="space-between"
      w="64"
      h="100vh"
      bg="black"
      color="white"
      p={4}
    >
      <VStack align="flex-start" gap={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Dashboard Flotex
        </Text>

        <VStack align="flex-start" gap={2} w="full">
          {menuItems.map(({ label, to, icon }) => {
            const isActive = location.pathname === to;
            return (
              <ChakraLink
                asChild
                color="white"
                key={to}
                w="full"
                px={3}
                py={2}
                bg={isActive ? "gray.700" : "transparent"}
                _hover={{ bg: "gray.600" }}
                textStyle="sm"
              >
                <Link to={to}>
                  <HStack gap={3}>
                    {icon}
                    <Text fontWeight={isActive ? "bold" : "normal"}>
                      {label}
                    </Text>
                  </HStack>
                </Link>
              </ChakraLink>
            );
          })}
        </VStack>
      </VStack>

      {/* Botón inferior */}
      <VStack align="flex-start" gap={2} w="full">
        <ChakraLink asChild w="full">
          <Link to="/shop">
            <Button
              w="full"
              variant="subtle"
              textAlign="center"
            >
              <LuShoppingBag />
              Ir a la tienda
            </Button>
          </Link>
        </ChakraLink>

        <Button
          variant="outline"
          textAlign="center"
          color="white"
          _hover={{
            bg: "transparent"
          }}
          w="full"
          onClick={() => {
            onLogout()
          }}
        >
          <LuLogOut />
          Cerrar sesión
        </Button>
      </VStack>
    </Flex>
  );
};

const Content = () => (
  <Box flex="1" p={6} bg="gray.50" h="100vh" overflow="hidden">
    <Container maxW="container.xl" h="full" display="flex" flexDirection="column">
      <Outlet />
    </Container>
  </Box>
);

export const DashboardLayout = withAuth(() => {
  return (
    <Flex>
      <Sidebar />
      <Content />
    </Flex>
  );
})

