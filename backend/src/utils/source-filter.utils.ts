import { SOURCE } from '@constants/enum/source.enum';

export const getSourceFilter = (source: SOURCE) => {
  const match: { [key: string]: any } = [SOURCE.APACHE, SOURCE.NGINX].includes(
    source,
  )
    ? { source }
    : {};

  return match;
};
