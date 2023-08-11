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

const CenterByAppointmentsFilter = ({ setfilterByDate, filterByDate }) => {
  return (
    <Flex mt={5} mb={5} justify="space-between" alignItems="center">
      <div className="">
        <InputGroup className="flex justify-between items-center gap-5  ">
          <Input
            border="1px"
            borderColor="slate.400"
            borderRadius="md"
            py={2}
            value={filterByDate.start_date}
            onChange={(e) =>
              setfilterByDate((prev) => ({
                ...prev,
                start_date: e.target.value,
              }))
            }
            w="200px" // Adjust the width here
            type="date"
          />
          <Input
            border="1px"
            borderColor="slate.400"
            borderRadius="md"
            py={2}
            value={filterByDate.end_date}
            onChange={(e) =>
              setfilterByDate((prev) => ({
                ...prev,
                end_date: e.target.value,
              }))
            }
            w="200px" // Adjust the width here
            type="date"
          />
        </InputGroup>
      </div>
    </Flex>
  );
};

export default CenterByAppointmentsFilter;
