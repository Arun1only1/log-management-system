import {
  commonResponseSizeUrl,
  getBarChartUrl,
  getTableDataUrl,
  mostActiveIpUrl,
  mostCommonMethodUrl,
  topAgentUrl,
  topHttpStatusCodeUrl,
  totalEventsUrl,
} from '@/api/url/logs-url';
import {
  IActiveIpResponse,
  IBarChartResponse,
  ICommonMethodResponse,
  IResponseSizeResponse,
  ISource,
  ITopAgentResponse,
  ITopStatusCodeResponse,
  ITotalEventsResponse,
} from '@/interface';
import { ILogTableDataResponse } from '@/interface/response/log-stat/log-table-data.interface';

import axiosInstance from '@/services/axios';

// ip
export const getMostActiveIp = async ({
  source,
}: ISource): Promise<IActiveIpResponse> => {
  const url = mostActiveIpUrl({ source });

  const res = await axiosInstance.get(url);

  return res.data;
};

// total events
export const getTotalEvents = async ({
  source,
}: ISource): Promise<ITotalEventsResponse> => {
  const url = totalEventsUrl({ source });

  const res = await axiosInstance.get(url);

  return res.data;
};

// common method
export const getMostCommonMethod = async ({
  source,
}: ISource): Promise<ICommonMethodResponse> => {
  const url = mostCommonMethodUrl({ source });

  const res = await axiosInstance.get(url);

  return res.data;
};

// http status code
export const getTopHttpStatusCode = async ({
  source,
}: ISource): Promise<ITopStatusCodeResponse> => {
  const url = topHttpStatusCodeUrl({ source });

  const res = await axiosInstance.get(url);

  return res.data;
};

//response size
export const getCommonResponseSize = async ({
  source,
}: ISource): Promise<IResponseSizeResponse> => {
  const url = commonResponseSizeUrl({ source });

  const res = await axiosInstance.get(url);

  return res.data;
};

//agent
export const getTopAgent = async ({
  source,
}: ISource): Promise<ITopAgentResponse> => {
  const url = topAgentUrl({ source });

  const res = await axiosInstance.get(url);

  return res.data;
};
// bar chart
export interface IBarChartOptions {
  dateOption: string;
  // source: string;
}

export const getBarChartData = async (
  options: IBarChartOptions & ISource
): Promise<IBarChartResponse> => {
  const url = getBarChartUrl(options);

  const res = await axiosInstance.get(url);

  return res.data;
};

export interface ITableDataOptions {
  search?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  limit?: number;
}

export const getTableData = async (
  options: ITableDataOptions & ISource
): Promise<ILogTableDataResponse> => {
  const url = getTableDataUrl(options);

  const res = await axiosInstance.get(url);

  return res.data;
};
