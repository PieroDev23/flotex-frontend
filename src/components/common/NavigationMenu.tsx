import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router";




export const MAIN_MENU = [
  { label: 'Inicio', path: '/' },
  { label: 'Tienda', path: '/shop' },
  { label: 'Faq', path: '/faq' },
  { label: 'Privacidad', path: '/privacy' },
];

export const NavigationMenu: React.FC<FlexProps> = (props) => {
  return (
    <Flex align="center" gap={21}  {...props}>
      {
        MAIN_MENU.map(nav => (
          <NavLink key={nav.path}
            style={({ isActive }) => ({ borderBottom: isActive ? "1px solid #87782D" : "none" })} to={nav.path}>
            {nav.label}
          </NavLink>
        ))
      }

    </Flex>
  )
}