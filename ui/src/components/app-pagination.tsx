import { usePagination } from '@/hooks/use-pagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onChange: (page: number) => void;
};
export default function AppPagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  onChange,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page);
    }
  };
  return (
    <Pagination className='py-4'>
      <PaginationContent className='flex flex-wrap gap-1 sm:gap-2 '>
        {/* Previous page button */}
        <PaginationItem>
          <PaginationPrevious
            className='transition-all duration-200 aria-disabled:pointer-events-none aria-disabled:opacity-40 hover:bg-muted hover:scale-105 active:scale-95'
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1 ? true : undefined}
            tabIndex={currentPage === 1 ? -1 : 0}
          />
        </PaginationItem>
        {/* First page link */}
        {!pages.includes(1) && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(1)}
                isActive={currentPage === 1}
                className=' transition-all rounded-xl duration-200 hover:bg-muted hover:scale-105 active:scale-95 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-medium data-[active=true]:shadow-sm'
              >
                1
              </PaginationLink>
            </PaginationItem>
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis className='mx-1 text-muted-foreground ' />
              </PaginationItem>
            )}
          </>
        )}
        {/* Page number links */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={page === currentPage}
              className=' cursor-pointer transition-all rounded-xl  duration-200 hover:bg-muted hover:scale-105 active:scale-95 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-medium data-[active=true]:shadow-sm'
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* Last page link */}
        {!pages.includes(totalPages) && totalPages > 1 && (
          <>
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis className='mx-1 text-muted-foreground' />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(totalPages)}
                isActive={currentPage === totalPages}
                className='transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-medium data-[active=true]:shadow-sm'
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {/* Next page button */}
        <PaginationItem>
          <PaginationNext
            className='transition-all rounded-xl duration-200 aria-disabled:pointer-events-none aria-disabled:opacity-40 hover:bg-muted hover:scale-105 active:scale-95'
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            aria-disabled={currentPage === totalPages ? true : undefined}
            tabIndex={currentPage === totalPages ? -1 : 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
