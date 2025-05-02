import AppPagination from '@/components/app-pagination';
import LogTable from '@/components/feature/log-table/table';
import TableFilter from '@/components/feature/log-table/table-filter';
import { SectionCards } from '@/components/section-cards';
import StatBarChart from '@/components/stat-bar-chart';
import { useDashboardQueryParams } from '@/hooks/query-params/use-dashboard-query-params';
import { useState } from 'react';

const Dashboard = () => {
  const { setPage, page } = useDashboardQueryParams();

  const [totalPages, setTotalPages] = useState(0);

  return (
    <div className='flex flex-1 flex-col '>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards />
          <div className='px-4 lg:px-6'>
            <StatBarChart />
          </div>
          <div className='px-6'>
            <TableFilter />

            <LogTable setTotalPages={setTotalPages} />
            {totalPages > 0 && (
              <AppPagination
                currentPage={page}
                totalPages={totalPages}
                paginationItemsToDisplay={10}
                onChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
