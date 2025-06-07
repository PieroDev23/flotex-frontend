import { Box, Table } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, row: any) => ReactNode;
  width?: string | number;
}

interface DataTableProps<T> {
  columns: Column[];
  data: T[];
  emptyMessage?: string;
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}

export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  emptyMessage = "No hay datos disponibles",
  isLoading = false,
  onRowClick,
}: DataTableProps<T>) => {
  return (
    <Box
      maxHeight="800px"
      overflowY="auto"
    >
      <Table.Root size="md">
        <Table.Header position="sticky" top={0} bg="gray.50" zIndex={1}>
          <Table.Row>
            {columns.map((column, index) => (
              <Table.ColumnHeader
                key={index}
                width={column.width}
                py={4}
                px={6}
                fontWeight="semibold"
                color="gray.700"
                borderBottom="2px solid"
                borderColor="gray.200"
              >
                {column.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.length === 0 ? (
            <Table.Row bg="white">
              <Table.Cell
                colSpan={columns.length}
                textAlign="center"
                py={8}
                px={6}
                color="gray.500"
              >
                {isLoading ? "Cargando..." : emptyMessage}
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((row, rowIndex) => (
              <Table.Row
                key={rowIndex}
                bg="white"
                cursor={onRowClick ? "pointer" : "default"}
                onClick={() => onRowClick && onRowClick(row)}
                _hover={{
                  bg: onRowClick ? "blue.50" : "gray.50",
                  transform: onRowClick ? "translateY(-1px)" : "none",
                  boxShadow: onRowClick ? "sm" : "none"
                }}
                transition="all 0.2s"
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                {columns.map((column, colIndex) => (
                  <Table.Cell
                    key={colIndex}
                    py={4}
                    px={6}
                    verticalAlign="middle"
                  >
                    {column.cell
                      ? column.cell(row[column.accessor], row)
                      : row[column.accessor]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};