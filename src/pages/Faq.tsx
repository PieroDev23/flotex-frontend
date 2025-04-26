import { Box, Heading, Stack, Text } from "@chakra-ui/react"
import { PageLayout } from "../layouts/PageLayout"

export default () => {
  return (
    <PageLayout title="FAQ">
      <Box maxW="3xl" mx="auto" py="10">
        <Stack gap={55}>
          <Box>
            <Heading size="2xl" mb="2">
              ¿Cuáles son los tiempos de entrega?
            </Heading>
            <Text color="muted">
              El tiempo de entrega estándar es de 3 a 5 días hábiles dentro de Lima Metropolitana. Para provincias puede tomar de 5 a 10 días hábiles.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="2">
              ¿Puedo comprar por metros o por rollos?
            </Heading>
            <Text color="muted">
              Sí, puedes comprar nuestras telas por metro o por rollo completo. El mínimo de compra es de 1 metro.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="2">
              ¿Realizan envíos a provincia?
            </Heading>
            <Text color="muted">
              Sí, realizamos envíos a todo el Perú a través de empresas de transporte seguras y rápidas.
            </Text>
          </Box>

          <Box>
            <Heading size="2xl" mb="2">
              ¿Qué métodos de pago aceptan?
            </Heading>
            <Text color="muted">
              Aceptamos tarjetas de crédito, débito, aunque en un futuro pensamos implementar todas las billeteras.
            </Text>
          </Box>
        </Stack>
      </Box>

    </PageLayout>
  )
}