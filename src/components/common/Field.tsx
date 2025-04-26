
import { Badge, Field as ChakraField, FieldRootProps } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";



export const Field: React.FC<PropsWithChildren<{
  label: string,
  helperText?: string,
  errorText?: string
} & FieldRootProps>> = ({ children, label, helperText, errorText, ...fieldRootProps }) => {
  return (
    <ChakraField.Root {...fieldRootProps}>
      <ChakraField.Label>
        {label}
        {fieldRootProps.required ? (
          <ChakraField.RequiredIndicator />
        ) : 
          <Badge ms={1}>Opcional</Badge>
        }
      </ChakraField.Label>
      {children}
      {helperText && (
        <ChakraField.HelperText>
          {helperText}
        </ChakraField.HelperText>
      )}
      {errorText && (
        <ChakraField.ErrorText>
          {errorText}
        </ChakraField.ErrorText>
      )}
    </ChakraField.Root>
  )
}