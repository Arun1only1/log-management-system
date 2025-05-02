import { DEFAULT_PAGE } from '@/constants';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from 'nuqs';

// Custom hook to manage and synchronize dashboard query parameters with the URL

export const useDashboardQueryParams = () => {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(DEFAULT_PAGE)
  );

  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );

  const [startDate, setStartDate] = useQueryState(
    'start_date',
    parseAsString.withDefault('')
  );

  const [endDate, setEndDate] = useQueryState(
    'end_date',
    parseAsString.withDefault('')
  );

  const [dateOption, setDateOption] = useQueryState(
    'chart',
    parseAsStringEnum(['day', 'month', 'year']).withDefault('day')
  );

  return {
    dateOption,
    endDate,
    page,
    search,
    setDateOption,
    setEndDate,
    setPage,
    setSearch,
    setStartDate,
    startDate,
  };
};
