import StatCard from "./stat-card";
import { Activity } from "lucide-react";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";
import { useTotalEvents } from "@/api/hooks/logs-stat/use-total-events";

const TotalEventsCard = () => {
  const { source } = useDashboardQueryParams();

  const { isPending, data } = useTotalEvents({ source });

  return (
    <StatCard
      isPending={isPending}
      title="Total Events"
      value={new Intl.NumberFormat().format(data?.totalEvents || 0)}
      icon={<Activity />}
    />
  );
};

export default TotalEventsCard;
