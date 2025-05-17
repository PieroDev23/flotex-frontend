import { HStack, IconButton, Image, NumberInput, Table } from "@chakra-ui/react";
import { useShop } from "../../context/ShopContext";
import { LuMinus, LuPlus, LuX } from "react-icons/lu";

export const CartTable = () => {
  const { cart, onDeleteCart, onUpdateQuantity } = useShop();
  return (
    <Table.Root >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader></Table.ColumnHeader>
          <Table.ColumnHeader>Nombre del producto</Table.ColumnHeader>
          <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
          <Table.ColumnHeader>Precio</Table.ColumnHeader>
          <Table.ColumnHeader></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {cart.products.map((item) => (
          <Table.Row key={item.id} height="fit">
            <Table.Cell>
              <Image src={item.imageUrl} alt={item.name} width={50} height={50} />
            </Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>
              <NumberInput.Root value={item.quantity.toString()}
                unstyled
                spinOnPress={false}
                min={1}
                onValueChange={(e) => onUpdateQuantity({ ...item, quantity: e.valueAsNumber })}>
                <HStack gap="2">
                  <NumberInput.DecrementTrigger asChild>
                    <IconButton variant="outline" size="sm" borderRadius="unset">
                      <LuMinus />
                    </IconButton>
                  </NumberInput.DecrementTrigger>
                  <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                  <NumberInput.IncrementTrigger asChild>
                    <IconButton variant="outline" size="sm" borderRadius="unset">
                      <LuPlus />
                    </IconButton>
                  </NumberInput.IncrementTrigger>
                </HStack>
              </NumberInput.Root>
            </Table.Cell>
            <Table.Cell>S/. {item.price.toFixed(2)}</Table.Cell>
            <Table.Cell >
              <IconButton variant="outline" size="xs" onClick={() => onDeleteCart(item)}>
                <LuX />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}