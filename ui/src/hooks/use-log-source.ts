import { ROUTES } from '@/constants';
import { useLocation } from 'react-router';

export const useLogSource = (): 'nginx' | 'apache' | 'all' => {
  const { pathname } = useLocation();

  return pathname.includes(ROUTES.APACHE)
    ? 'apache'
    : pathname.includes(ROUTES.NGINX)
    ? 'nginx'
    : 'all';
};
