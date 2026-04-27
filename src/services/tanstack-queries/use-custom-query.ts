import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { useEffect } from "react";

type CustomQueryOptions<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
};

export const useCustomQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  onSuccess,
  onError,
  ...config
}: CustomQueryOptions<TQueryFnData, TError, TData, TQueryKey>) => {
  const props = useQuery(config);

  const { isSuccess, data, isError, error } = props;

  useEffect(() => {
    if (isSuccess && data !== undefined && onSuccess) {
      onSuccess(data);
    }
  }, [isSuccess, data, onSuccess]);

  useEffect(() => {
    if (isError && error && onError) {
      onError(error);
    }
  }, [isError, error, onError]);

  return props;
};
