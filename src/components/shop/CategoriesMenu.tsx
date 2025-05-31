import { Button, For, Menu, useCheckboxGroup } from "@chakra-ui/react"
import { LuList } from "react-icons/lu"
import { useCategories } from "../../hooks/api"
import { Category } from "../../types"
import { CustomMenu } from "../common/Menu"
import React from "react"



export const CategoriesMenu: React.FC<{
  group: ReturnType<typeof useCheckboxGroup>;
}> = ({ group }) => {
  const { data: categories } = useCategories();
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
        {`Listar ${group.value.length > 0 ? `(${group.value.length})` : ""}`}
      </Button>
    }>
      <Menu.ItemGroup>
        <Menu.ItemGroupLabel>Listar por Categorías</Menu.ItemGroupLabel>
        <For each={categories}>
          {(categorie: Category) => (
            <Menu.CheckboxItem
              onCheckedChange={_ => group.toggleValue(categorie.id)}
              checked={group.isChecked(categorie.id)}
              key={categorie.id}
              value={categorie.id}
              textTransform="capitalize"
            >
              {categorie.name}
              <Menu.ItemIndicator />
            </Menu.CheckboxItem>
          )}
        </For>
      </Menu.ItemGroup>
    </CustomMenu>
  )
}