import { useCommonStatusCode } from '@/api/hooks/logs-stat/use-common-status-code';
import { useLogSource } from '@/hooks/use-log-source';
import { Code } from 'lucide-react';
import StatCard from './stat-card';

const TopHttpStatusCodeCard = () => {
  const source = useLogSource();

  const { isPending, data } = useCommonStatusCode({
    source,
  });

  return (
    <StatCard
      isPending={isPending}
      title='Top Http Status Code'
      value={String(data?.statusCode || 0)}
      icon={<Code />}
    />
  );
};

export default TopHttpStatusCodeCard;
