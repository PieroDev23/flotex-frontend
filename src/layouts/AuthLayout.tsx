import { Flex, Grid } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router";



export const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid justifyContent="center" minH="100dvh" bgColor="#fcfcfc" position="relative">
      <Flex pos="absolute" p={5} align="center" gap={3}>
        <LuArrowLeft />
        <Link to="/" style={{ textDecoration: "underline" }}>Regresar a la home</Link>
      </Flex>
      {children}
    </Grid>
  )
}