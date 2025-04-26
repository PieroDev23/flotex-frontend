import { Box, Container, Stack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { Banner } from "../components/common/Banner";
import { QualityAssurance } from "../components/common/QualityAssuarance";







export const PageLayout: React.FC<PropsWithChildren<{ title: string }>> = ({ children, title }) => {
  return (
    <Stack gap={55}>
      <Box>
        <Banner title={title} />
        {/* <Toolbar /> */}
      </Box>
      <Container mb={55}>
        {children}
        {/* <ProductsGrid products={products} /> */}
      </Container>
      <QualityAssurance />
    </Stack>
  )
}