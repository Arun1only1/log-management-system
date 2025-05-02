import { ILogTableDataResponse, ISource } from '@/interface';
import { getTableData, ITableDataOptions } from '@/api/function/logs-function';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_LIMIT } from '@/constants';

export const useLogsTable = ({
  search,
  startDate,
  endDate,
  source,
  page,
  limit = DEFAULT_LIMIT,
}: ITableDataOptions & ISource) => {
  const { isPending, isError, data, error } = useQuery<
    ILogTableDataResponse,
    string
  >({
    queryKey: [
      'get-table-data',
      search,
      startDate,
      endDate,
      source,
      page,
      limit,
    ],
    queryFn: async () => {
      return await getTableData({
        search,
        startDate,
        endDate,
        source,
        page,
        limit,
      });
    },
  });

  return { isPending, isError, data, error };
};
