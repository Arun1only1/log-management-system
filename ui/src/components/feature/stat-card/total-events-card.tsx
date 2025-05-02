import { useTotalEvents } from '@/api/hooks/logs-stat/use-total-events';
import { useLogSource } from '@/hooks/use-log-source';
import { Activity } from 'lucide-react';
import StatCard from './stat-card';

const TotalEventsCard = () => {
  const source = useLogSource();

  const { isPending, data } = useTotalEvents({ source });

  return (
    <StatCard
      isPending={isPending}
      title='Total Events'
      value={new Intl.NumberFormat().format(data?.totalEvents || 0)}
      icon={<Activity />}
    />
  );
};

export default TotalEventsCard;
