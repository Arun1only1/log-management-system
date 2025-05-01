import { ISource, ITotalEventsResponse } from "@/interface";
import { QUERY_KEY } from "@/constants";
import { getTotalEvents } from "@/api/function/logs-function";
import { useQuery } from "@tanstack/react-query";

export const useTotalEvents = ({ source }: ISource) => {
  const { isPending, data, isError } = useQuery<ITotalEventsResponse, string>({
    queryKey: [QUERY_KEY.GET_TOTAL_EVENTS, source],
    queryFn: async () => {
      return await getTotalEvents({ source });
    },
  });

  return { isPending, data, isError };
};
