import { IResponseSizeResponse, ISource } from "@/interface";
import { QUERY_KEY } from "@/constants";
import { getCommonResponseSize } from "@/api/function/logs-function";
import { useQuery } from "@tanstack/react-query";

export const useCommonResponseSize = ({ source }: ISource) => {
  const { isPending, data, isError } = useQuery<IResponseSizeResponse, string>({
    queryKey: [QUERY_KEY.GET_COMMON_RESPONSE_SIZE, source],
    queryFn: async () => {
      return await getCommonResponseSize({ source });
    },
  });

  return { isPending, data, isError };
};
