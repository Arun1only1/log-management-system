import { DateRangePicker } from "@/components/ui/date-range-picker";
import { SearchBar } from "@/components/ui/search-bar";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";

const TableFilter = () => {
  const { search, setSearch, startDate, setStartDate, endDate, setEndDate } =
    useDashboardQueryParams();

  return (
    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-background border rounded-lg">
      <div className="w-full sm:flex-1">
        <SearchBar
          isSearching={false}
          onSearch={setSearch}
          searchValue={search}
        />
      </div>
      <div className="w-full sm:w-auto ">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
    </div>
  );
};

export default TableFilter;
