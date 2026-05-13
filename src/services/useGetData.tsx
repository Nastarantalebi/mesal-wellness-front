import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Request, SupportRequest } from "../libs/httpService";

type TGetData = {
  url: string;
  queryKey: string | string[];
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  staleTime?: number;
  retry?: boolean | number;
  support?: boolean;
  refetchOnMount?: boolean;
  gcTime?: number;
};

async function getdata<T>(url: string, qs?: string) {
  const { data }: { data: T } = await Request.get(qs ? url + qs : url);
  return data;
}
async function getdataSupport<T>(url: string) {
  const { data }: { data: T } = await SupportRequest.get(url);
  return data;
}
function useGetData<T>({
  url,
  queryKey,
  enabled = true,
  support = false,
  gcTime,
  refetchOnMount,
  retry = false,
  staleTime,
}: TGetData) {
  const { search } = useLocation();

  const customSearch = url.includes("?") ? search.replaceAll("?", "&") : search;
  const queryObject = Object.fromEntries(new URLSearchParams(customSearch));
  return useQuery({
    queryKey: [queryKey, queryObject],
    queryFn: () =>
      support ? getdataSupport<T>(url) : getdata<T>(url, customSearch),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
    retry,
    gcTime,
    refetchOnMount,
  });
}

export default useGetData;
