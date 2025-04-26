import { Container, Flex } from "@chakra-ui/react";
import React from "react";


export const Toolbar: React.FC = () => {
  return (
    <Flex bgColor="yellow.400/10" minH={100}>
      <Container minH="full" display="flex" alignItems="center" justifyContent="center">
        Encuentra lo que necesites en nuestra tienda
      </Container>
    </Flex>
  )
}