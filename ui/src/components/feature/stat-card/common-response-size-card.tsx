import StatCard from "./stat-card";
import { MessageSquareReply } from "lucide-react";
import { useCommonResponseSize } from "@/api/hooks/logs-stat/use-common-response-size";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";

const CommonResponseSizeCard = () => {
  const { source } = useDashboardQueryParams();

  const { isPending, data } = useCommonResponseSize({ source });

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <StatCard
      title="Common Response Size"
      value={`${data?.bytes || 0} bytes`}
      icon={<MessageSquareReply />}
    />
  );
};

export default CommonResponseSizeCard;
