import { Request, SupportRequest } from "@/libs/httpService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
interface PagedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

type TInfiniteData = {
  initialUrl: string;
  queryKey: string | string[];
  enabled?: boolean;
  appendSearch?: boolean;
  support?: boolean;
  staleTime?: number;
  refetchIntervalInBackground?: boolean;
  refetchInterval?: number;
};

async function fetchPages<T>(url: string): Promise<PagedResponse<T>> {
  const { data } = await Request.get(url);
  return data as PagedResponse<T>;
}
async function getdataSupport<T>(url: string): Promise<PagedResponse<T>> {
  const { data }: { data: T } = await SupportRequest.get(url);
  return data as PagedResponse<T>;
}
function useInfiniteData<T>({
  initialUrl,
  queryKey,
  enabled = true,
  appendSearch = true,
  support = false,
  staleTime = 60000,
  refetchIntervalInBackground,
  refetchInterval,
}: TInfiniteData) {
  const { search } = useLocation();
  const normalizedSearch = appendSearch
    ? new URLSearchParams(search).toString() // ✅ normalize
    : "";
  const fullUrl = normalizedSearch
    ? initialUrl.includes("?")
      ? `${initialUrl}&${normalizedSearch}`
      : `${initialUrl}?${normalizedSearch}`
    : initialUrl;
  return useInfiniteQuery<PagedResponse<T>>({
    queryKey: [queryKey, fullUrl],
    queryFn: ({ pageParam }) =>
      support
        ? getdataSupport<T>(pageParam as any)
        : fetchPages<T>(pageParam as any),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    initialPageParam: fullUrl,
    enabled,
    staleTime,
    refetchInterval,
    refetchIntervalInBackground,
  });
}

export default useInfiniteData;
