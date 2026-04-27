import { useCustomQuery } from "../../services/tanstack-queries/use-custom-query";
import { getMe } from "../../api/get-me/get-me";

export const useGetMe = ({ enabled = false }: { enabled?: boolean }) =>
  useCustomQuery({
    queryFn: () => getMe(),
    queryKey: ["get-me"],
    staleTime: 5 * 60 * 1000,
    enabled,
  });
