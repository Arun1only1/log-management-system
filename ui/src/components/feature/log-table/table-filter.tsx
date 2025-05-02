import { DateRangePicker } from '@/components/ui/date-range-picker';
import { SearchBar } from '@/components/ui/search-bar';
import { useDashboardQueryParams } from '@/hooks/query-params/use-dashboard-query-params';

const TableFilter = () => {
  const { search, setSearch, startDate, setStartDate, endDate, setEndDate } =
    useDashboardQueryParams();

  return (
    <div className='border rounded-2xl shadow-sm p-6 bg-white dark:bg-muted'>
      <div className='font-semibold text-lg text-foreground pb-4'>
        Table Log Data
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-4'>
        <div className='w-full sm:w-auto'>
          <SearchBar
            isSearching={false}
            onSearch={setSearch}
            searchValue={search}
          />
        </div>
        <div className='w-full sm:w-auto'>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
    </div>
  );
};

export default TableFilter;
