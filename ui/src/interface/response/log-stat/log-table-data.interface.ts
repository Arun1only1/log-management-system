export interface ILogItem {
  _id: string;
  city: string;
  country: string;
  date: string;
  ip: string;
  method: string;
  protocol: string;
  region: string;
  responseSize: number;
  source: string;
  statusCode: number;
  url: string;
}

interface PaginationMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface ILogTableDataResponse {
  items: ILogItem[];
  meta: PaginationMeta;
}
