import { useTopUserAgent } from '@/api/hooks/logs-stat/use-top-user-agent';
import { useLogSource } from '@/hooks/use-log-source';
import { ShieldUser } from 'lucide-react';
import StatCard from './stat-card';

const TopUserAgentCard = () => {
  const source = useLogSource();

  const { isPending, data } = useTopUserAgent({ source });

  return (
    <StatCard
      isPending={isPending}
      title='Top User Agent'
      value={data?.agent ? `${data.agent.substring(0, 50)}...` : ''}
      icon={<ShieldUser />}
    />
  );
};

export default TopUserAgentCard;
