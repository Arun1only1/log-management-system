interface IUrl {
  module: string;
  options: {
    [key: string]: any;
  };
}

// builds url based upon provided options
export const buildApiUrl = (details: IUrl): string => {
  const queryParams = new URLSearchParams(details.options).toString();

  return queryParams ? `${details.module}?${queryParams}` : details.module;
};
