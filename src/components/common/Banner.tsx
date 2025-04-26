import { Flex, Heading, Stack } from "@chakra-ui/react"
import React from "react"
import { CustomBreadcrumb } from "./Breadcrumb"




export const Banner: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Flex
      bgImage="url('/img/banner.jpg')"
      bgPos="center"
      bgSize="cover"
      height={300}
      position="relative"
      align="center"
      justify="center"
    >
      <Stack position="absolute" zIndex="docked" justify="center" align="center" bgColor="white" py={21} px={35}>
        <Heading size="5xl">{title}</Heading>
        <CustomBreadcrumb />
      </Stack>
    </Flex>
  )
}