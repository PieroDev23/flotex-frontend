import { Box, Heading, Stack, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ProductForm } from "../components/products/ProductForm";
import { useCategories, useCreateProduct, invalidateProductsCache } from "../hooks/api";

export default () => {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const createProductMutation = useCreateProduct();
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
        
        if (key === "price" || key === "stock") {
          data[key] = parseFloat(value as string);
        } else {
          data[key] = value;
        }
      }

      await createProductMutation.trigger(data);
      setSubmitSuccess(true);

      // Invalidate products cache to reflect the new product
      await invalidateProductsCache();

      // Redirect after successful creation
      setTimeout(() => {
        navigate("/dashboard/productos");
      }, 2000);

    } catch (error) {
      console.error("Error creating product:", error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : "Error al crear el producto. Por favor, intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/productos");
  };

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
            Crear Nuevo Producto
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Completa la información para agregar un nuevo producto al catálogo
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
            <Text color="green.600" fontSize="sm">¡Producto creado exitosamente! Redirigiendo...</Text>
          </Box>
        )}

        {/* Form */}
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          submitButtonText="Crear Producto"
        />
      </Stack>
    </Box>
  );
};
