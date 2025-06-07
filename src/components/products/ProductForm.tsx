import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Field } from "../common/Field";
import { Select } from "../common/Select";
import { Product, Category } from "../../types";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  image?: FileList;
}

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSubmit,
  isLoading = false,
  submitButtonText = "Guardar Producto"
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      sku: product?.sku || "",
      stock: product?.stock || 0,
      categoryId: product?.categoryId || "",
    }
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.imageUrl || null
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = [
    { label: "Selecciona una categoría", value: "" },
    ...categories.map(category => ({
      label: category.name,
      value: category.id
    }))
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = async (data: ProductFormData) => {
    try {
      setSubmitError(null);
      
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("sku", data.sku);
      formData.append("stock", data.stock.toString());
      formData.append("categoryId", data.categoryId);

      // Add image if selected
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      // Add product ID for editing
      if (product?.id) {
        formData.append("id", product.id.toString());
      }

      await onSubmit(formData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Error al guardar el producto");
    }
  };

  return (
    <Box w="full" p={6}>
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.200"
        w="full"
      >
        <Box p={6}>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <VStack gap={6} align="stretch">
              {submitError && (
                <Box p={4} bg="red.50" borderRadius="lg" border="1px solid" borderColor="red.200">
                  <Text color="red.600" fontWeight="medium">{submitError}</Text>
                </Box>
              )}

              {/* Main Content - Image and Basic Info Side by Side */}
              <Flex gap={8} direction={{ base: "column", lg: "row" }} align="flex-start">
                {/* Image Upload Section */}
                <Box flex="0 0 400px" maxW={{ base: "full", lg: "400px" }}>
                  <Text fontSize="md" fontWeight="semibold" mb={3} color="gray.700">
                    Imagen del Producto
                  </Text>
                  <Box
                    p={4}
                    border="2px dashed"
                    borderColor="gray.300"
                    borderRadius="lg"
                    bg="gray.50"
                    textAlign="center"
                    _hover={{ borderColor: "blue.400", bg: "blue.50" }}
                    transition="all 0.2s"
                    h="300px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {imagePreview ? (
                      <VStack gap={3}>
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          maxH="200px"
                          maxW="300px"
                          objectFit="cover"
                          borderRadius="md"
                          boxShadow="sm"
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          colorScheme="blue"
                          variant="outline"
                          size="sm"
                        >
                          Cambiar Imagen
                        </Button>
                      </VStack>
                    ) : (
                      <VStack gap={3}>
                        <Text fontSize="3xl">📷</Text>
                        <Text color="gray.600" fontSize="sm" fontWeight="medium">
                          Selecciona una imagen
                        </Text>
                        <Text color="gray.500" fontSize="xs">
                          PNG, JPG hasta 10MB
                        </Text>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          colorScheme="blue"
                          size="sm"
                        >
                          Seleccionar Imagen
                        </Button>
                      </VStack>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      display="none"
                    />
                  </Box>
                </Box>

                {/* Basic Information Section */}
                <Box flex="1">
                  <Text fontSize="md" fontWeight="semibold" mb={4} color="gray.700">
                    Información Básica
                  </Text>
                  <VStack gap={4} align="stretch">

                    {/* Product Name */}
                    <Field
                      label="Nombre del Producto"
                      required
                      invalid={!!errors.name}
                      errorText={errors.name?.message}
                    >
                      <Input
                        {...register("name", {
                          required: "El nombre es requerido",
                          minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
                        })}
                        placeholder="Ingresa el nombre del producto"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                      />
                    </Field>

                    {/* SKU */}
                    <Field
                      label="SKU (Código del Producto)"
                      required
                      invalid={!!errors.sku}
                      errorText={errors.sku?.message}
                      helperText="Código único para identificar el producto"
                    >
                      <Input
                        {...register("sku", {
                          required: "El SKU es requerido",
                          pattern: {
                            value: /^[A-Z0-9-]+$/,
                            message: "El SKU solo puede contener letras mayúsculas, números y guiones"
                          }
                        })}
                        placeholder="Ej: PROD-001"
                        textTransform="uppercase"
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                      />
                    </Field>

                    {/* Description */}
                    <Field
                      label="Descripción"
                      required
                      invalid={!!errors.description}
                      errorText={errors.description?.message}
                      helperText="Describe las características principales del producto"
                    >
                      <Textarea
                        {...register("description", {
                          required: "La descripción es requerida",
                          minLength: { value: 10, message: "La descripción debe tener al menos 10 caracteres" }
                        })}
                        placeholder="Describe el producto, sus características, materiales, usos..."
                        rows={3}
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                        resize="vertical"
                      />
                    </Field>
                  </VStack>
                </Box>
              </Flex>

              {/* Pricing, Inventory and Category Section */}
              <Box>
                <Text fontSize="md" fontWeight="semibold" mb={4} color="gray.700">
                  Precio, Inventario y Categoría
                </Text>
                <Flex gap={6} direction={{ base: "column", md: "row" }} align="flex-start">
                  {/* Price */}
                  <Field
                    label="Precio (S/.)"
                    required
                    invalid={!!errors.price}
                    errorText={errors.price?.message}
                    flex={1}
                  >
                    <Box position="relative">
                      <Text
                        position="absolute"
                        left={3}
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                        fontSize="sm"
                        fontWeight="medium"
                        zIndex={1}
                      >
                        S/.
                      </Text>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register("price", {
                          required: "El precio es requerido",
                          min: { value: 0.01, message: "El precio debe ser mayor a 0" },
                          valueAsNumber: true
                        })}
                        placeholder="0.00"
                        pl={10}
                        bg="white"
                        border="1px solid"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                      />
                    </Box>
                  </Field>

                  {/* Stock */}
                  <Field
                    label="Stock Disponible"
                    required
                    invalid={!!errors.stock}
                    errorText={errors.stock?.message}
                    flex={1}
                  >
                    <Input
                      type="number"
                      min="0"
                      {...register("stock", {
                        required: "El stock es requerido",
                        min: { value: 0, message: "El stock no puede ser negativo" },
                        valueAsNumber: true
                      })}
                      placeholder="0"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.300"
                      _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                    />
                  </Field>

                  {/* Category */}
                  <Field
                    label="Categoría"
                    required
                    invalid={!!errors.categoryId}
                    errorText={errors.categoryId?.message}
                    flex={1}
                  >
                    <Box
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      _focusWithin={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                    >
                      <Select
                        options={categoryOptions}
                        value={watch("categoryId") || ""}
                        onChange={(e) => setValue("categoryId", e.target.value)}
                        ref={null}
                      />
                    </Box>
                  </Field>
                </Flex>
              </Box>

              {/* Submit Section */}
              <Box pt={6} borderTop="1px solid" borderColor="gray.200">
                <Flex justify="flex-end" gap={3}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? "Guardando..." : submitButtonText}
                  </Button>
                </Flex>
              </Box>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
