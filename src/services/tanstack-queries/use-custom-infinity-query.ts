import { UseInfiniteQueryOptions, QueryKey, useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { useEffect } from "react";

type CustomInfinityQueryOptions<
  TQueryFnData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey,
> = UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TQueryFnData>, TQueryKey> & {
  onSuccess?: (data: InfiniteData<TQueryFnData>) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: InfiniteData<TQueryFnData> | undefined, error: TError | null) => void;
};

export const useCustomInfinityQuery = <TQueryFnData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>({
  onSuccess,
  onError,
  onSettled,
  ...config
}: CustomInfinityQueryOptions<TQueryFnData, TError, TQueryKey>) => {
  const props = useInfiniteQuery(config);

  const { status, data, isError, error } = props;

  useEffect(() => {
    if (status === "success" && onSuccess) {
      onSuccess(data);
    }
  }, [status, data, onSuccess]);

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
