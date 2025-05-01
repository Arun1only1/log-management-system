import { ICommonMethodResponse, ISource } from "@/interface";
import { QUERY_KEY } from "@/constants";
import { getMostCommonMethod } from "@/api/function/logs-function";
import { useQuery } from "@tanstack/react-query";

export const useCommonMethod = ({ source }: ISource) => {
  const { isPending, data, isError } = useQuery<ICommonMethodResponse, string>({
    queryKey: [QUERY_KEY.GET_COMMON_METHOD, source],
    queryFn: async () => {
      return await getMostCommonMethod({ source });
    },
  });

  return { isPending, data, isError };
};
