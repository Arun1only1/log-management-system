import StatCard from "./stat-card";
import { MessageSquareReply } from "lucide-react";
import { useCommonResponseSize } from "@/api/hooks/logs-stat/use-common-response-size";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";
import { bytesToKB } from "@/utils/format-bytes";

const CommonResponseSizeCard = () => {
  const { source } = useDashboardQueryParams();

  const { isPending, data } = useCommonResponseSize({ source });

  return (
    <StatCard
      isPending={isPending}
      title="Common Response Size"
      value={bytesToKB(data?.bytes || 0)}
      icon={<MessageSquareReply />}
    />
  );
};

export default CommonResponseSizeCard;
