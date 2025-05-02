import { useCommonMethod } from '@/api/hooks/logs-stat/user-common-method';
import { useLogSource } from '@/hooks/use-log-source';
import { GitPullRequest } from 'lucide-react';
import StatCard from './stat-card';

const MostCommonMethodCard = () => {
  const source = useLogSource();

  const { isPending, data } = useCommonMethod({ source });

  return (
    <StatCard
      isPending={isPending}
      title='Most Common Method'
      value={data?.method || ''}
      icon={<GitPullRequest />}
    />
  );
};

export default MostCommonMethodCard;
