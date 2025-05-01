import * as React from "react";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export function DateRangePicker({
  className,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  React.useEffect(() => {
    if (date?.from && date?.to) {
      setStartDate(format(date.from, "yyyy-MM-dd"));
      setEndDate(format(date.to, "yyyy-MM-dd"));
    } else {
      setStartDate("");
      setEndDate("");
    }
  }, [date, setStartDate, setEndDate]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full  justify-start text-left font-normal",
              !date && "text-muted-foreground",
              "cursor-pointer"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="capitalize"> select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            disabled={{ after: new Date() }}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
