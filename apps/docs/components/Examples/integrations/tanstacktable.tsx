"use client";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  InputField,
  InputGroup,
  Prefix,
  Spinner,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Td,
  Th,
  Tr,
  classNames,
} from "@rafty/ui";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

type DataType = {
  flight_number: number;
  mission_name: string;
  launch_year: number;
  is_tentative: number;
  launch_window: string;
  rocket: {
    rocket_name: string;
  };
};

function BasicTable({
  data,
  columns,
}: {
  data: DataType[];
  columns: ColumnDef<DataType>[];
}) {
  const [sort, setSort] = useState<ColumnSort[]>([]);
  const [filter, setFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sort,
      globalFilter: filter,
    },
    onSortingChange: setSort,
    onGlobalFilterChange: setFilter,
  });
  return (
    <div className="container mx-auto space-y-4">
      <InputGroup>
        <Prefix>
          <MagnifyingGlassIcon width={16} />
        </Prefix>
        <InputField
          variant="outline"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search..."
        />
      </InputGroup>
      <TableContainer>
        <Table variant="striped" size="sm" className="table-fixed w-full">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isLastColumn = headerGroup.headers.length - 1 == index;

                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={classNames(
                        isLastColumn && "text-center",
                        index == 0 ? "w-10" : "w-max",
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={classNames(
                            index == 0 && "justify-center",
                            "flex items-center",
                          )}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon height={12} />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon height={12} />
                          ) : null}
                        </div>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => {
                  const isLastColumn =
                    row.getVisibleCells().length - 1 == index;

                  return (
                    <Td
                      key={cell.id}
                      id=""
                      className="whitespace-nowrap truncate"
                      style={{
                        textAlign:
                          isLastColumn || index == 0 ? "center" : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end gap-3">
        <Button
          size="sm"
          leftIcon={<ArrowLeftIcon width={10} />}
          isDisabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Prev
        </Button>
        <Button
          size="sm"
          rightIcon={<ArrowRightIcon width={10} />}
          isDisabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function TanstackTable() {
  const { data, isLoading } = useQuery<DataType[]>({
    queryKey: ["demo"],
    queryFn: async () =>
      await fetch("https://api.spacexdata.com/v3/launches").then((res) =>
        res.json(),
      ),
  });

  const columns = useMemo<ColumnDef<DataType>[]>(
    () => [
      {
        header: "Id",
        accessorKey: "flight_number",
      },
      {
        header: "Mission Name",
        accessorKey: "mission_name",
      },
      {
        header: "Launch Year",
        accessorKey: "launch_year",
      },
      {
        header: "Tentative",
        accessorKey: "is_tentative",
      },
      {
        header: "Launch Window",
        accessorKey: "launch_window",
      },
      {
        header: "Rocket Name",
        cell: ({ row }) => row.original.rocket.rocket_name,
      },
    ],
    [],
  );

  if (isLoading)
    return (
      <div className="flex item-center justify-center">
        <Spinner className="text-cyan-400 " size="lg" />
      </div>
    );

  if (data) return <BasicTable data={data} columns={columns} />;
}

const CLIENT = new QueryClient();

export const tanstack_table_examples = {
  "tanstack_table:usage": (
    <QueryClientProvider client={CLIENT}>
      <TanstackTable />
    </QueryClientProvider>
  ),
};
