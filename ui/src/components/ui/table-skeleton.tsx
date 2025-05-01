import { DEFAULT_LIMIT } from "@/constants";
import { Skeleton } from "./skeleton";

interface Props {
  columnCount?: number;
}
const TableSkeleton = ({ columnCount = 6 }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="rounded-md border border-border">
        <div className="p-1">
          <div className="flex items-center bg-muted/50 p-2 rounded-md">
            {Array.from({ length: columnCount }).map((_, i) => (
              <Skeleton key={i} className="h-8 flex-1 mx-1" />
            ))}
          </div>
          {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
            <div
              key={i}
              className="flex items-center p-2 border-b border-border"
            >
              {Array.from({ length: columnCount }).map((_, j) => (
                <Skeleton key={j} className="h-6 flex-1 mx-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
