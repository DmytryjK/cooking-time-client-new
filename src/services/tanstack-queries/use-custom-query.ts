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
  onSettled?: (data: TData | undefined, error: TError | null) => void;
};

export const useCustomQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  onSuccess,
  onError,
  onSettled,
  ...config
}: CustomQueryOptions<TQueryFnData, TError, TData, TQueryKey>) => {
  const props = useQuery(config);

  const { status, isSuccess, data, isError, error } = props;

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

  useEffect(() => {
    if (onSettled && (status === "success" || status === "error")) {
      onSettled(data, error);
    }
  }, [status, data]);
  return props;
};
