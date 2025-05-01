import StatCard from "./stat-card";
import { ShieldUser } from "lucide-react";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";
import { useTopUserAgent } from "@/api/hooks/logs-stat/use-top-user-agent";

const TopUserAgentCard = () => {
  const { source } = useDashboardQueryParams();

  const { isPending, data } = useTopUserAgent({ source });

  return (
    <StatCard
      isPending={isPending}
      title="Top User Agent"
      value={data?.agent || ""}
      icon={<ShieldUser />}
    />
  );
};

export default TopUserAgentCard;
