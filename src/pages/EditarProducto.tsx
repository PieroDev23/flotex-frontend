import { Box, Heading, Stack, Button, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { mutate } from "swr";
import { ProductForm } from "../components/products/ProductForm";
import { useCategories, useGetProduct, useUpdateProduct } from "../hooks/api";

export default () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { data: categories = [] } = useCategories();
  const { data: product, isLoading: isLoadingProduct, error: productError } = useGetProduct(
    parseInt(productId || "0"),
    !!productId
  );
  const updateProductMutation = useUpdateProduct(parseInt(productId || "0"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      // Convert FormData to regular object for now since API expects JSON
      const data: Record<string, any> = {};

      for (const [key, value] of formData.entries()) {
        if (key === "image" && value instanceof File) {
          // For now, we'll skip the image since API doesn't support multipart
          // TODO: Implement image upload when API supports it
          continue;
        }

        if (key === "id") {
          continue; // Skip ID as it's handled by the mutation
        }

        if (key === "price" || key === "stock") {
          data[key] = parseFloat(value as string);
        } else {
          data[key] = value;
        }
      }

      await updateProductMutation.trigger(data);
      setSubmitSuccess(true);

      // Invalidate cache for products list to reflect the update
      mutate(key => typeof key === 'string' && key.startsWith('products/list'));

      // Also invalidate the specific product cache
      mutate(`products/${productId}`);

      // Redirect after successful update
      setTimeout(() => {
        navigate("/dashboard/productos");
      }, 2000);

    } catch (error) {
      console.error("Error updating product:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Error al actualizar el producto. Por favor, intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/productos");
  };

  if (isLoadingProduct) {
    return (
      <Box minH="100vh" bg="gray.50" p={6}>
        <Stack h="60vh" align="center" justify="center" gap={4}>
          <Spinner size="lg" color="blue.500" />
          <Text fontSize="md" color="gray.600">
            Cargando producto...
          </Text>
        </Stack>
      </Box>
    );
  }

  if (productError || !product) {
    return (
      <Box minH="100vh" bg="gray.50" p={6}>
        <Stack gap={4}>
          <Box>
            <Button
              variant="ghost"
              onClick={handleCancel}
              mb={3}
              color="gray.600"
              _hover={{ color: "gray.800", bg: "gray.100" }}
            >
              ← Volver a Productos
            </Button>
            <Heading size="lg" color="gray.800" mb={1}>Error al Cargar Producto</Heading>
            <Text color="gray.600" fontSize="sm">
              No se pudo encontrar el producto solicitado
            </Text>
          </Box>

          <Box p={4} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.200">
            <Text color="red.600" fontSize="sm">
              No se pudo cargar el producto. Verifica que el ID sea correcto.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" p={6}>
      <Stack gap={4}>
        {/* Header */}
        <Box>
          <Button
            variant="ghost"
            onClick={handleCancel}
            mb={3}
            color="gray.600"
            _hover={{ color: "gray.800", bg: "gray.100" }}
          >
            ← Volver a Productos
          </Button>
          <Heading size="lg" color="gray.800" mb={1}>
            Editar Producto: {product.name}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Modifica la información del producto según sea necesario
          </Text>
        </Box>

        {/* Alerts */}
        {submitError && (
          <Box p={3} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.200">
            <Text color="red.600" fontSize="sm">{submitError}</Text>
          </Box>
        )}

        {submitSuccess && (
          <Box p={3} bg="green.50" borderRadius="md" border="1px solid" borderColor="green.200">
            <Text color="green.600" fontSize="sm">¡Producto actualizado exitosamente! Redirigiendo...</Text>
          </Box>
        )}

        {/* Form */}
        <ProductForm
          product={product}
          categories={categories}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          submitButtonText="Actualizar Producto"
        />
      </Stack>
    </Box>
  );
};
