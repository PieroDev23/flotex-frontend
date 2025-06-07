import { Button, Menu } from "@chakra-ui/react";
import React from "react";
import { LuSettings2 } from "react-icons/lu";
import { useProducts } from "../../hooks/api";
import { CustomMenu } from "../common/Menu";

const items = [
  { label: "Más baratos", value: "asc" },
  { label: "Más caros", value: "desc" }
]

export const PriceSortMenu: React.FC<{
  onChange: (value: string) => void;
  value: string;
}> = ({
  onChange,
  value
}) => {
    const { mutate } = useProducts();
    return (
      <CustomMenu trigger={
        <Button
          variant="ghost"
          _expanded={{
            bg: "transparent",
          }}
          borderRadius="unset"
          _hover={{
            bgColor: "transparent"
          }}
        >
          <LuSettings2 />
          {value ? `Ordenando ${items.find(i => i.value === value)?.label}` : "Ordenar"}
        </Button>
      }>
        <Menu.RadioItemGroup value={value} onValueChange={e => {
          onChange(e.value);
          mutate();
        }}>
          <Menu.ItemGroupLabel>
            Ordenar por precio
          </Menu.ItemGroupLabel>
          {items.map(item => (
            <Menu.RadioItem key={item.value} value={item.value}>
              {item.label}
              <Menu.ItemIndicator />
            </Menu.RadioItem>
          ))}
        </Menu.RadioItemGroup>
      </CustomMenu>
    )
  }
