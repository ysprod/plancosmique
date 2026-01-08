import { useStars } from '@/hooks/commons/useStars';

export function useNotFoundStars() {
  // You can extend this hook if you want to add custom logic for the 404 page
  return useStars();
}
