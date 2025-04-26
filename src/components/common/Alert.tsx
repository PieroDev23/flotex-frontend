import { Alert } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"





export const CustomAlert: React.FC<PropsWithChildren<{
  title: string,
  status?: "success" | "info" | "warning" | "error"
}>> = ({ title, children, status = "success" }) => {

  return (
    <Alert.Root mb={21} status={status} borderRadius="unset">
      <Alert.Indicator />
      <Alert.Content display="flex" flexDir={{ base: "column", md: "row" }}>
        <Alert.Title fontWeight="semibold">{title}</Alert.Title>
        <Alert.Description>
          {children}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}