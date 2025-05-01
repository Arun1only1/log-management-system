import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

export const formatDate = (date: Date | string): string => {
  return dayjs().to(dayjs(date));
};
