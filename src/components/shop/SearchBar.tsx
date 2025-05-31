import { Flex, Input, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSearchParams } from "react-router";

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar productos..."
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("name") || "");

  const handleSearch = () => {
    if (searchValue) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set("name", searchValue);
        return newParams;
      });
    } else {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("name");
        return newParams;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Flex justify="center" gap={2}>
      <InputGroup startElement={<LuSearch />}>
        <Input
          w="80"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          borderRadius="unset"
          bg="white"
        />
      </InputGroup>
    </Flex>
  );
};
