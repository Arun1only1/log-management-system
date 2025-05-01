import StatCard from "./stat-card";
import { GitPullRequest } from "lucide-react";
import { useCommonMethod } from "@/api/hooks/logs-stat/user-common-method";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";

const MostCommonMethodCard = () => {
  const { source } = useDashboardQueryParams();

  const { isPending, data } = useCommonMethod({ source });

  return (
    <StatCard
      isPending={isPending}
      title="Most Common Method"
      value={data?.method || ""}
      icon={<GitPullRequest />}
    />
  );
};

export default MostCommonMethodCard;
