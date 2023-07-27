import React from "react";
import {
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const IDsFilter = ({ setfilters, filters }) => {
  return (
    <Flex mt={5} mb={5} justify="space-between" alignItems="center">
      <div className="">
        <InputGroup className="flex justify-between items-center gap-5  ">
          <>
            <InputLeftElement
              alignItems="center"
              marginTop={".1rem"}
              pointerEvents="none"
              children={<BsSearch />}
              color="gray.400"
            />
            <Input
              border="1px"
              borderColor="slate.400"
              borderRadius="md"
              py={2}
              value={filters.name}
              onChange={(e) =>
                setfilters((prev) => ({ ...prev, name: e.target.value }))
              }
              px={2}
              pl="10"
              w="200px" // Adjust the width here
              type="text"
              placeholder="Filter by name"
            />
          </>
          <Input
            border="1px"
            borderColor="slate.400"
            borderRadius="md"
            py={2}
            value={filters.code}
            onChange={(e) =>
              setfilters((prev) => ({ ...prev, code: e.target.value }))
            }
            w="200px" // Adjust the width here
            type="text"
            placeholder="filter trans code"
          />
        </InputGroup>
      </div>
    </Flex>
  );
};

export default IDsFilter;
