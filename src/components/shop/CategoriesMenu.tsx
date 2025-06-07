import { Button, Menu } from "@chakra-ui/react"
import React from "react"
import { LuList } from "react-icons/lu"
import { useCategories, useProducts } from "../../hooks/api"
import { Category } from "../../types"
import { CustomMenu } from "../common/Menu"



export const CategoriesMenu: React.FC<{
  onChange: (value: string) => void;
  value: string;
}> = ({ value, onChange }) => {
  const { data: categories } = useCategories();
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
        <LuList />
        {value ? `Mostrando ${categories?.find((c: Category) => c.id === value)?.name}` : "listar"}
      </Button>
    }>
      <Menu.RadioItemGroup value={value} onValueChange={e => {
        onChange(e.value)
        mutate();
      }}>
        <Menu.ItemGroupLabel>
          Categorías
        </Menu.ItemGroupLabel>
        {categories?.map((c: Category) => (
          <Menu.RadioItem key={c.id} value={c.id}>
            {c.name}
            <Menu.ItemIndicator />
          </Menu.RadioItem>
        ))}
      </Menu.RadioItemGroup>
    </CustomMenu>
  )
}