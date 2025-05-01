import StatCard from "./stat-card";
import { Cpu } from "lucide-react";
import { useActiveIp } from "@/api/hooks/logs-stat/use-active-ip";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";

const MostActiveIpCard = () => {
  const { source } = useDashboardQueryParams();

  const { isPending, data } = useActiveIp({ source });

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <StatCard title="Most Active IP" value={data?.ip || ""} icon={<Cpu />} />
  );
};

export default MostActiveIpCard;
