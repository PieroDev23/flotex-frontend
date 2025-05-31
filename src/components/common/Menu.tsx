import { Menu } from "@chakra-ui/react";
import React, { PropsWithChildren, ReactNode } from "react";




export const CustomMenu: React.FC<
  PropsWithChildren<{ trigger: ReactNode }>> =
  ({ trigger, children }) => {
    return (
      <Menu.Root>
        <Menu.Trigger
          asChild
          justifyContent="center"
        >
          {trigger}
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content p={21} minW={144}>
            {children}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    )
  }