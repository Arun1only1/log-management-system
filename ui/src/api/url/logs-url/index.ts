import {
  IBarChartOptions,
  ITableDataOptions,
} from "@/api/function/logs-function";
import { ISource } from "@/interface";
import { buildApiUrl } from "@/utils/build-api-url";

export const totalEventsUrl = (options: ISource): string => {
  const url = buildApiUrl({
    module: "/logs/total-events",
    options,
  });

  return url;
};

export const mostActiveIpUrl = (options: ISource): string => {
  const url = buildApiUrl({
    module: "/logs/active-ip",
    options,
  });

  return url;
};

export const mostCommonMethodUrl = (options: ISource): string => {
  const url = buildApiUrl({
    module: "/logs/common-method",
    options,
  });

  return url;
};

export const topHttpStatusCodeUrl = (options: ISource): string => {
  const url = buildApiUrl({
    module: "/logs/http-status-code",
    options,
  });

  return url;
};

export const commonResponseSizeUrl = (options: ISource): string => {
  const url = buildApiUrl({
    module: "/logs/response-size",
    options,
  });

  return url;
};

export const topAgentUrl = (options: ISource): string => {
  const url = buildApiUrl({
    module: "/logs/user-agent",
    options,
  });

  return url;
};

export const getBarChartUrl = (options: IBarChartOptions & ISource) => {
  const url = buildApiUrl({
    module: "/logs/bar-chart-data",
    options: {
      date_option: options.dateOption,
      source: options.source,
    },
  });

  return url;
};

export const getTableDataUrl = (options: ITableDataOptions & ISource) => {
  const url = buildApiUrl({
    module: "/logs/log-data",
    options,
  });

  return url;
};
