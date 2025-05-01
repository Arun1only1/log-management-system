import { IActiveIpResponse, ISource } from "@/interface";
import { QUERY_KEY } from "@/constants";
import { getMostActiveIp } from "@/api/function/logs-function";
import { useQuery } from "@tanstack/react-query";

export const useActiveIp = ({ source }: ISource) => {
  const { isPending, data, isError } = useQuery<IActiveIpResponse, string>({
    queryKey: [QUERY_KEY.GET_ACTIVE_IP, source],
    queryFn: async () => {
      return await getMostActiveIp({
        source,
      });
    },
  });

  return { isPending, data, isError };
};
