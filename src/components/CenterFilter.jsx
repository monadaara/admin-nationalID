import React from "react";
import {
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
} from "@chakra-ui/react";
import { BsPlus, BsSearch } from "react-icons/bs";

const CenterFilter = ({ setModalShow, setCenterFilter }) => {
  return (
    <Flex mt={5} mb={5} justify="space-between" alignItems="center">
      <InputGroup alignItems={"center"}>
        <InputLeftElement
          alignItems="center"
          marginTop={".6rem"}
          pointerEvents="none"
          children={<BsSearch />}
          color="gray.400"
        />
        <Input
          border="1px"
          borderColor="slate.400"
          borderRadius="md"
          py={2}
          onChange={(e) => setCenterFilter({ name: e.target.value })}
          px={2}
          pl="10"
          w="200px" // Adjust the width here
          type="text"
          placeholder="Filter by name"
        />
        <Select
          border="1px"
          w="200px"
          borderColor="slate.400"
          borderRadius="md"
          py={2}
          px={2}
          ml={2} // Add margin for spacing
          onChange={(e) => setCenterFilter({ status: e.target.value })}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </Select>
      </InputGroup>

      <Button
        onClick={() => setModalShow(true)}
        bg="blue.400"
        px={5}
        py={2}
        rounded="lg"
        color="white"
        display="flex"
        alignItems="center"
        ml={3}
      >
        <span>
          {" "}
          <BsPlus />
        </span>
        Add Center
      </Button>
    </Flex>
  );
};

export default CenterFilter;
