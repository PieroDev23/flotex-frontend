import { Container, Stack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { Banner } from "../components/common/Banner";
import { QualityAssurance } from "../components/common/QualityAssuarance";
import { Toolbar } from "../components/shop/Toolbar";



export const PageLayout: React.FC<PropsWithChildren<{ title: string, showToolbar?: boolean }>> =
  ({ children, title, showToolbar = false }) => {
    return (
      <Stack gap={55}>
        <Stack gap="0">
          <Banner title={title} />
          {showToolbar && <Toolbar />}
        </Stack>
        <Container mb={55}>
          {children}
        </Container>
        <QualityAssurance />
      </Stack>
    )
  }