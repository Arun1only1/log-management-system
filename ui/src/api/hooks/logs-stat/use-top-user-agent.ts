import { ISource, ITopAgentResponse } from "@/interface";
import { QUERY_KEY } from "@/constants";
import { getTopAgent } from "@/api/function/logs-function";
import { useQuery } from "@tanstack/react-query";

export const useTopUserAgent = ({ source }: ISource) => {
  const { isPending, data, isError } = useQuery<ITopAgentResponse, string>({
    queryKey: [QUERY_KEY.GET_TOP_USER_AGENT, source],
    queryFn: async () => {
      return await getTopAgent({ source });
    },
  });

  return { isPending, data, isError };
};
