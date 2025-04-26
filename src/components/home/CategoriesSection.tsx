import { Box, Button, Flex, Heading, Image, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";
import { useCategories } from "../../hooks/api";
import { Category } from "../../types";
import { Section } from "../common/Section";



const CategoryCard: React.FC<Category> = ({ imageUrl, name, id }) => {
  return (
    <Stack flexBasis={{ base: 380, lg: "full" }}>
      <Box
        cursor="pointer"
        position="relative"
        w="100%"
      >
        <Link to={`/shop?category=${id}`}>
          <Image
            src={imageUrl}
            display="block"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Flex
            opacity={0}
            transition="opacity 100ms ease-in-out"
            _hover={{ opacity: 1 }}
            justify="center"
            align="center"
            position="absolute"
            top={0} bgColor="black/50"
            w="full"
            h="full"
          >
            <Button borderRadius="unset" bgColor="white" color="black">Ver más</Button>
          </Flex>
        </Link>
      </Box>
      <Heading textAlign="center" size="lg" textTransform="capitalize">{name}</Heading>
    </Stack>
  )
}

export const CategoriesGridSkeleton = () => {
  return (
    <Flex gap={21} justify="center" wrap={{ base: "wrap", lg: "nowrap" }} align="center">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Stack flexBasis={{ base: 380, lg: "full" }} key={idx} position="relative">
          <Box w="100%">
            <Image
              src="https://fakeimg.pl/640x940/"
              objectFit="cover"
              display="block"
              w="100%"
              h="100%"
            />
          </Box>
          <Box position="absolute" w="full" h="full" bgColor="white" />
          <Skeleton variant="shine" position="absolute" w="full" h="full" />
        </Stack>
      ))}
    </Flex>
  )
}

export const CategoriesSection: React.FC = () => {
  const { data: categories, isLoading } = useCategories();
  return (
    <Section
      title="Nuestra categorías"
      description="Explora entre nuestras categorías, tenemos ofertas y nuevas colecciones por lanzamiento"
    >
      {
        isLoading ?
          <CategoriesGridSkeleton /> :
          <Flex gap={21} justify="center" wrap={{ base: "wrap", lg: "nowrap" }}>
            {categories.map((category: Category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </Flex>
      }
    </Section>

  )
}