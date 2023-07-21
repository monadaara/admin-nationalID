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

const ApplicationFilter = ({
  setAppointmentFilter,
  appointmentFilter,
  setfilterByDate,
  filterByDate,
  centers,
}) => {
  return (
    <Flex mt={5} mb={5} justify="space-between" alignItems="center">
      <div className="">
        <InputGroup className="flex justify-between items-center gap-5  ">
          <>
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
              value={appointmentFilter.name}
              onChange={(e) => setAppointmentFilter({ name: e.target.value })}
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
            value={filterByDate}
            onChange={(e) => setfilterByDate(e.target.value)}
            w="200px" // Adjust the width here
            type="date"
          />

          <Select
            border="1px"
            w="200px"
            borderColor="slate.400"
            borderRadius="md"
            py={2}
            value={appointmentFilter.center}
            onChange={(e) =>
              setAppointmentFilter({ center: e.target.value, status: "all" })
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
      </div>
    </Flex>
  );
};

export default ApplicationFilter;
