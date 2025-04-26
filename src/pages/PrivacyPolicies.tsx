import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { PageLayout } from "../layouts/PageLayout";

export default () => {
  return (
    <PageLayout title="Políticas de Privacidad">
      <Box maxW="3xl" mx="auto" py="10">
        <Stack gap={55}>
          <Box>
            <Heading size="2xl" mb="4">
              Introducción
            </Heading>
            <Text color="muted">
              En Flotex, nos comprometemos a proteger la privacidad de nuestros usuarios y clientes. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="4">
              Información que recopilamos
            </Heading>
            <Text color="muted">
              Recopilamos información personal como nombre, dirección, correo electrónico, número de teléfono y detalles de pago cuando realizas una compra o te registras en nuestra tienda.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="4">
              Uso de la información
            </Heading>
            <Text color="muted">
              Utilizamos tu información para procesar pedidos, mejorar nuestros servicios, enviarte actualizaciones sobre tu compra y ofrecerte promociones relacionadas con nuestros productos.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="4">
              Protección de tus datos
            </Heading>
            <Text color="muted">
              Implementamos medidas de seguridad adecuadas para proteger tu información personal contra el acceso no autorizado, alteración o destrucción.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="4">
              Compartir información
            </Heading>
            <Text color="muted">
              No vendemos, alquilamos ni compartimos tu información personal con terceros, salvo cuando sea necesario para completar tu compra o cumplir con obligaciones legales.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="4">
              Cambios en esta política
            </Heading>
            <Text color="muted">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te recomendamos revisarla periódicamente para estar informado sobre cómo protegemos tu información.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="4">
              Contacto
            </Heading>
            <Text color="muted">
              Si tienes alguna duda o consulta sobre nuestra política de privacidad, puedes contactarnos al correo: contacto@flotex.pe
            </Text>
          </Box>
        </Stack>
      </Box>
    </PageLayout>
  );
}
