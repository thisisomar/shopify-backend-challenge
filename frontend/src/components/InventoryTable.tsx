import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Tooltip,
  IconButton,
  Flex,
  Text,
  Select,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  Spinner,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useTable, usePagination, CellValue } from "react-table";
import React, { useEffect } from 'react';
import { FiArrowLeft, FiArrowRight, FiChevronsLeft, FiChevronsRight, FiEdit, FiTrash } from 'react-icons/fi';
import { useDeleteItemMutation, useGetInventoryQuery } from '../generated/graphql';

export const InventoryTable: React.FC = ({ }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (tableProps: any) =>
        (
          <Box>
            <Tooltip label="Delete">
              <IconButton
                colorScheme="red"
                aria-label="Delete"
                icon={<FiTrash/>}
                size="sm"
                onClick={() => {
                  deleteItemFromTable(tableProps.row.original.id);
                }}
                mr={"4"}
              />
            </Tooltip>
            <Tooltip label="Edit">
              <IconButton
                  colorScheme="blue"
                  aria-label="Edit"
                  icon={<FiEdit/>}
                  size="sm"
                  onClick={() => {
                    router.push(`/${tableProps.row.original.id}`);
                  }}
              />
            </Tooltip>
          </Box>
        )
      },
    ],
    []
  )
  const router = useRouter();
  const toast = useToast();
  
  const [{ data, fetching }] = useGetInventoryQuery();
  const [, deleteItem] = useDeleteItemMutation();
  const [getData, setData] = React.useState(data?.items);

  async function deleteItemFromTable(itemId: string) {
    await deleteItem({
      itemId: parseInt(itemId.toString())
    });

    toast({
      title: "Success",
      description: "Item deleted successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  useEffect(() => {
    setData(data?.items);
  }, [data]);
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns: columns as any,
      data: getData ? getData : [],
      initialState: { pageIndex: 0 },
      autoResetPage: false,
      autoResetSortBy: false
    },
    usePagination
  );

  if (fetching) {
    return (
      <Flex justify={"center"} align={"center"}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    )
  }

  return (
    <Box>
      <Table variant="simple" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
                <Tr {...row.getRowProps()}
                  _hover={{
                    background: "#76888D1A",
                  }}
                  key={row.original.id}
                >
                  {row.cells.map((cell: CellValue) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              aria-label="First Page"
              icon={<FiChevronsLeft />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<FiArrowLeft />}
              aria-label="Previous Page"
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value: any) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<FiArrowRight />}
              aria-label="Next Page"
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              aria-label="Last Page"
              icon={<FiChevronsRight />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};