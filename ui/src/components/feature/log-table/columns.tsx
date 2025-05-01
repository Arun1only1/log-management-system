import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { bytesToKB } from "@/utils/format-bytes";
import { formatDate } from "@/utils/format-date";
import { getMethodColor } from "@/utils/get-method-color";
import { getStatusCodeDescription } from "@/utils/get-status-code";
import { getStatusCodeColor } from "@/utils/get-status-code-color";
import { ExternalLink, MapPin, Server } from "lucide-react";
import { ILogItem } from "@/interface";

// Helper function to get source icon
const getSourceIcon = (source: string) => {
  switch (source.toLowerCase()) {
    case "nginx":
      return <Server className="h-4 w-4" />;
    case "apache":
      return <Server className="h-4 w-4" />;
    default:
      return <ExternalLink className="h-4 w-4" />;
  }
};

export const logsColumn: ColumnDef<ILogItem>[] = [
  {
    accessorKey: "ip",
    header: "IP",
    cell: ({ row }) => (
      <div className="font-mono text-xs">{row.original.ip}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-sm whitespace-nowrap">
              {formatDate(row.original.date)}
            </div>
          </TooltipTrigger>
          <TooltipContent>{row.original.date}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        {getSourceIcon(row.original.source)}
        <span className="capitalize text-sm">{row.original.source}</span>
      </div>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`font-mono text-xs ${getMethodColor(row.original.method)}`}
      >
        {row.original.method}
      </Badge>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.original.url;
      const displayUrl = url.length > 30 ? `${url.substring(0, 30)}...` : url;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="font-mono text-xs max-w-[200px] truncate">
                {displayUrl}
              </div>
            </TooltipTrigger>
            <TooltipContent>{url}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "protocol",
    header: "Protocol",
    cell: ({ row }) => (
      <div className="font-mono text-xs uppercase">{row.original.protocol}</div>
    ),
  },
  {
    accessorKey: "statusCode",
    header: "Status",
    cell: ({ row }) => {
      const statusCode = row.original.statusCode;
      const description = getStatusCodeDescription(statusCode);

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant="outline"
                className={`font-mono text-xs ${getStatusCodeColor(
                  statusCode
                )}`}
              >
                {statusCode}
              </Badge>
            </TooltipTrigger>
            {description && <TooltipContent>{description}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "responseSize",
    header: "Response Size",
    cell: ({ row }) => (
      <div className="text-sm text-left">
        {bytesToKB(row.original.responseSize)}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const { country, city, region } = row.original;
      const location = [city, region, country].filter(Boolean).join(", ");

      return (
        <div className="flex items-center gap-1.5 max-w-[200px]">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-sm truncate">{location || "Unknown"}</div>
              </TooltipTrigger>
              {location && <TooltipContent>{location}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
