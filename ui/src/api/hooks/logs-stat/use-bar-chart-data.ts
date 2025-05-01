import { DateOptionType, IBarChartResponse, ISource } from "@/interface";
import { getBarChartData } from "@/api/function/logs-function";
import { useQuery } from "@tanstack/react-query";

interface Props extends ISource {
  date_option: DateOptionType;
}
export const useBarChartData = ({ date_option, source }: Props) => {
  const { isPending, data, isError } = useQuery<IBarChartResponse, string>({
    queryKey: ["get-bar-chart-data", date_option, source],
    queryFn: async () => {
      return await getBarChartData({ dateOption: date_option, source });
    },
  });

  return { isPending, data, isError };
};
