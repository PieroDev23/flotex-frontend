import { Container, Flex } from "@chakra-ui/react"
import { CustomBreadcrumb } from "../../common/Breadcrumb"




export const Navbar = () => {
  return (
    <Flex h={55} borderBottom="1px solid {gray/25}" align="center">
      <Container as={Flex} alignItems="center" color="white">
        <CustomBreadcrumb />
      </Container>
    </Flex>
  )
}