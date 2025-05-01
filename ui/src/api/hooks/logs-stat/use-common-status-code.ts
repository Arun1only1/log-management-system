import { ISource, ITopStatusCodeResponse } from "@/interface";
import { QUERY_KEY } from "@/constants";
import { getTopHttpStatusCode } from "@/api/function/logs-function";
import { useQuery } from "@tanstack/react-query";

export const useCommonStatusCode = ({ source }: ISource) => {
  const { isPending, data, isError } = useQuery<ITopStatusCodeResponse, string>(
    {
      queryKey: [QUERY_KEY.GET_COMMON_STATUS_CODE, source],
      queryFn: async () => {
        return await getTopHttpStatusCode({ source });
      },
    }
  );

  return { isPending, data, isError };
};
