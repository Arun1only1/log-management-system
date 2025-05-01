import { useLogsTable } from "@/api/hooks/logs-stat/use-logs-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/ui/table-skeleton";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";
import { logsColumn } from "./columns";
import TableFilter from "./table-filter";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";

const LogTable = () => {
  const { search, startDate, endDate, source } = useDashboardQueryParams();

  const { isPending, data, isError, error } = useLogsTable({
    search,
    startDate,
    endDate,
    source,
  });

  const table = useReactTable({
    data: data?.items || [],
    columns: logsColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <TableSkeleton columnCount={logsColumn.length} />;
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || "Failed to load log data"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 px-6">
      <TableFilter />
      <div className="rounded-md border border-border shadow-sm overflow-hidden ">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-medium text-foreground h-11"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={logsColumn.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-2"></div>
    </div>
  );
};

export default LogTable;
