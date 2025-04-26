import { Heading, Stack, StackProps, Text } from "@chakra-ui/react";
import React from "react";





export const Section: React.FC<{ title?: string, description?: string } & StackProps> = ({ title, description, ...props }) => {
  const { children, ...rest } = props;
  return (
    <Stack gap={55} {...rest} as="section">
      <Stack align="center">
        {title && <Heading textAlign="center" fontWeight="bold" size="4xl" color="brand.secondary">{title}</Heading>}
        {description && <Text color="fg.muted">{description}</Text>}
      </Stack>
      {children}
    </Stack>
  )
}