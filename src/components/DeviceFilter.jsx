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

const DeviceFilter = ({
  setModalShow,
  setDeviceFilter,
  deviceFilter,
  setIs_updating,
  centers,
}) => {
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
          value={deviceFilter.name}
          onChange={(e) => setDeviceFilter({ name: e.target.value })}
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
          pl="10"
          value={deviceFilter.status}
          ml={2} // Add margin for spacing
          onChange={(e) =>
            setDeviceFilter({ status: e.target.value, center: "all" })
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </Select>
        <Select
          border="1px"
          w="200px"
          borderColor="slate.400"
          borderRadius="md"
          py={2}
          px={2}
          value={deviceFilter.center}
          pl="10"
          ml={2} // Add margin for spacing
          onChange={(e) =>
            setDeviceFilter({ center: e.target.value, status: "all" })
          }
        >
          <option value="all">All</option>
          {centers?.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </Select>
      </InputGroup>

      <Button
        onClick={() => {
          setIs_updating(false);
          setModalShow(true);
        }}
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
        Add Device
      </Button>
    </Flex>
  );
};

export default DeviceFilter;
