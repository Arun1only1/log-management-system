export interface IPrivateRoutes {
  DASHBOARD: string;
  NGINX: string;
  APACHE: string;
}

export interface IPublicRoutes {
  LOGIN: string;
}

export interface IRoutes extends IPrivateRoutes, IPublicRoutes {}
