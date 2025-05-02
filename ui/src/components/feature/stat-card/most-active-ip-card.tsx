import { useActiveIp } from '@/api/hooks/logs-stat/use-active-ip';
import { useLogSource } from '@/hooks/use-log-source';
import { Cpu } from 'lucide-react';
import StatCard from './stat-card';

const MostActiveIpCard = () => {
  const source = useLogSource();

  const { isPending, data } = useActiveIp({ source });

  return (
    <StatCard
      title='Most Active IP'
      value={data?.ip || ''}
      icon={<Cpu />}
      isPending={isPending}
    />
  );
};

export default MostActiveIpCard;
