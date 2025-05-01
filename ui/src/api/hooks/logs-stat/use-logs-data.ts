import { ILogTableDataResponse, ISource } from "@/interface";
import { getTableData, ITableDataOptions } from "@/api/function/logs-function";
import { useQuery } from "@tanstack/react-query";

export const useLogsTable = ({
  search,
  startDate,
  endDate,
  source,
}: ITableDataOptions & ISource) => {
  const { isPending, isError, data, error } = useQuery<
    ILogTableDataResponse,
    string
  >({
    queryKey: ["get-table-data", search, startDate, endDate, source],
    queryFn: async () => {
      return await getTableData({
        search,
        startDate,
        endDate,
        source,
      });
    },
  });

  return { isPending, isError, data, error };
};
