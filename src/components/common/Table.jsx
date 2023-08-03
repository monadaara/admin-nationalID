import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";

const CustomTable = ({ columns, data, lists, setModal_data, viewDocument }) => {
  const hasStatusColumn = columns.includes("Status");

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-400";
      case "blocked":
        return "bg-red-400";
      case "pending":
        return "bg-orange-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Box className="" overflowX="auto">
      <Table variant="striped" colorScheme="gray" size="md">
        {data?.length ? (
          <>
            <Thead>
              <Tr bg="gray.300">
                {columns.map((column) => (
                  <Th
                    textTransform={"capitalize"}
                    key={column}
                    py={2}
                    px={4}
                    textAlign="left"
                    color="gray.700"
                    fontWeight="semibold"
                  >
                    {column.replace(/_/g, " ")}
                  </Th>
                ))}
                {lists && (
                  <Th
                    textTransform={"capitalize"}
                    py={2}
                    px={4}
                    textAlign="left"
                    color="gray.700"
                    fontWeight="semibold"
                  >
                    Actions
                  </Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((row, index) => {
                const columnsToRender = columns.filter(
                  (column) => column !== "Status"
                ); // Exclude "Status" from table body columns

                return (
                  <Tr key={index} bg={index % 2 === 0 ? "gray.100" : ""}>
                    {columnsToRender.map((column) => (
                      <Td key={column} py={2} px={4}>
                        {row[column]}
                      </Td>
                    ))}
                    {hasStatusColumn && (
                      <Td py={2} px={4}>
                        {row.Status ? (
                          <button
                            className={`${getStatusColor(
                              row.Status
                            )} rounded-full px-4 py-1 `}
                          >
                            {row.Status}
                          </button>
                        ) : (
                          <span>No Status</span>
                        )}
                      </Td>
                    )}
                    <Td py={2} px={4}>
                      {lists?.length ? (
                        <Menu>
                          <MenuButton>
                            <BsThreeDotsVertical className="text-gray-600" />
                          </MenuButton>
                          <MenuList>
                            {lists.map((list) => (
                              <MenuItem
                                onClick={() => {
                                  setModal_data(row);
                                  list.onclick();
                                }}
                                key={list.title}
                              >
                                {list.title}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      ) : lists ? (
                        <div className="flex gap-x-3">
                          <button
                            onClick={() => {
                              setModal_data(row);
                              lists.onclick(row);
                            }}
                            className="px-5 w-full py-2 flex items-center text-white rounded bg-blue-500 justify-center"
                          >
                            <span className="">{lists.icon}</span>
                            {lists.title}
                          </button>
                          {viewDocument ? (
                            <button
                              onClick={() => {
                                viewDocument.onclick(row.document.file);
                              }}
                              className="px-5 w-full py-2 flex items-center text-white rounded bg-blue-500"
                            >
                              <span>{viewDocument.icon}</span>
                              {viewDocument.title}
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </>
        ) : (
          <p className="text-center w-full">No data found</p>
        )}
      </Table>
    </Box>
  );
};

export default CustomTable;
