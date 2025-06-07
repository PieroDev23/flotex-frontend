import React from "react";
import { DataTable } from "../common/DataTable";
import { Badge } from "@chakra-ui/react";

// Definición del tipo de usuario
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: "ADMIN" | "CUSTOMER";
  active: "ACTIVE" | "INACTIVE";
}

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
  onUserClick?: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ 
  users = [], 
  isLoading = false,
  onUserClick
}) => {
  const columns = [
    {
      header: "ID",
      accessor: "id",
      width: "80px"
    },
    {
      header: "Nombre",
      accessor: "firstname",
      cell: (value: string, row: User) => `${value} ${row.lastname}`
    },
    {
      header: "Email",
      accessor: "email"
    },
    {
      header: "Teléfono",
      accessor: "phone"
    },
    {
      header: "Rol",
      accessor: "role",
      cell: (value: string) => (
        <Badge colorScheme={value === "ADMIN" ? "purple" : "blue"}>
          {value}
        </Badge>
      )
    },
    {
      header: "Estado",
      accessor: "active",
      cell: (value: string) => (
        <Badge colorScheme={value === "ACTIVE" ? "green" : "red"}>
          {value}
        </Badge>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      emptyMessage="No hay usuarios registrados"
      onRowClick={onUserClick}
    />
  );
};