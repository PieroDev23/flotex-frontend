import { Badge, Heading, Span, Stack, TableBody, TableCell, TableColumnHeader, TableHeader, TableRoot, TableRow } from "@chakra-ui/react";
import { useParams } from "react-router";
import { Item } from "../context/ShopContext";
import { useOrders } from "../hooks/api";
import { PageLayout } from "../layouts/PageLayout";


export const statusBadge: { [k: string]: { name: string, color: string } } = {
  "RECEIVED": { name: "RECIBIDO", color: "green" },
  "IN_PROGRESS": { name: "EN PROGRESO", color: "purple" },
  "SHIPPING": { name: "ENVIANDO", color: "yellow" },
  "DELIVERED": { name: "ENTREGADO", color: "blue" },
  "CANCELED": { name: "CANCELADO", color: "red" }
}


export default () => {
  const { getOrder } = useOrders();
  const params = useParams();
  const { data: order } = getOrder(params.id || "");
  return (
    <PageLayout title="¡Orden recibida!">
      <Stack gap={13}>
        <Heading size="2xl">¡Gracias por tu compra! - Total: <Span>S/.{Number(order?.totalAmount).toFixed(2)}</Span></Heading>
        <Stack as="ul" gap={3}>
          <li>Estado: <Badge colorPalette={statusBadge[order?.status || "CANCELED"].color}>{statusBadge[order?.status || "CANCELED"].name}</Badge></li>
          <li>Nombre: {order?.guestFirstname} {order?.guestLastname}</li>
          <li>Email: {order?.guestEmail}</li>
          <li>Dirección: {order?.guestAddress}</li>
          <li>Teléfono: {order?.guestPhone}</li>
        </Stack>
      </Stack>
      <Stack w="full" gap={13} mt={13}>
        <Heading size="lg" mt={8}>
          Detalle de Productos
        </Heading>
        <TableRoot size="lg">
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Producto</TableColumnHeader>
              <TableColumnHeader>Precio</TableColumnHeader>
              <TableColumnHeader>Cantidad</TableColumnHeader>
              <TableColumnHeader>Subtotal</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.items.map((item: Item, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>S/.{item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>S/.{Number(item.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Stack>
    </PageLayout>
  )
}