interface IConfig {
  BASE_URL: string;
}
export const config: IConfig = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
};
