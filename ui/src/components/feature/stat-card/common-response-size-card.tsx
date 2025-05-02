import { useCommonResponseSize } from '@/api/hooks/logs-stat/use-common-response-size';
import { useLogSource } from '@/hooks/use-log-source';
import { bytesToKB } from '@/utils/format-bytes';
import { MessageSquareReply } from 'lucide-react';
import StatCard from './stat-card';

const CommonResponseSizeCard = () => {
  const source = useLogSource();

  const { isPending, data } = useCommonResponseSize({ source });

  return (
    <StatCard
      isPending={isPending}
      title='Common Response Size'
      value={bytesToKB(data?.bytes || 0)}
      icon={<MessageSquareReply />}
    />
  );
};

export default CommonResponseSizeCard;
