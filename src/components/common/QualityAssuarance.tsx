import { Box, Container, Flex, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { LuBadgeCheck, LuHeadset, LuTrophy, LuTruck } from "react-icons/lu";



type FeatureItemProps = {
  title: string;
  description: string;
  Icon: IconType;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, Icon }) => {
  return (
    <Flex align="center" gap={3} minW={{ base: "full", lg: "auto" }}>
      <Icon size={55} />
      <Stack gap={0}>
        <Heading>{title}</Heading>
        <Text color="black/70">{description}</Text>
      </Stack>
    </Flex>
  )
}

export const QualityAssurance = () => {
  return (
    <Box minH={300} >
      <Separator />
      <Container display="flex" gap={8} flexDir={{ base: "column", lg: "row" }} alignItems="center" minH="100%" justifyContent="space-between">
        <FeatureItem
          title="Alta calidad"
          description="Hecho con los mejores materiales."
          Icon={LuTrophy}
        />
        <FeatureItem
          title="Garantía completa"
          description="Desde 2 años"
          Icon={LuBadgeCheck}
        />
        <FeatureItem
          title="Envío Gratis"
          description="Desde compras mayores a 100 soles"
          Icon={LuTruck}
        />
        <FeatureItem
          title="Soporte 24/7"
          description="Soporte dedicado"
          Icon={LuHeadset}
        />
      </Container>
    </Box>
  )
}