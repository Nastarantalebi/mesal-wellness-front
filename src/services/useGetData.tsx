import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Request } from "../libs/httpService";

type TGetData = {
  url: string;
  queryKey: string | string[];
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  staleTime?: number;
  retry?: boolean | number;
};

async function getdata<T>(url: string, qs?: string) {
  const { data }: { data: T } = await Request.get(url + qs);
  return data;
}

function useGetData<T>({
  url,
  queryKey,
  enabled = true,
  retry,
  staleTime,
}: TGetData) {
  const { search } = useLocation();

  const queryObject = Object.fromEntries(new URLSearchParams(search));

  return useQuery({
    queryKey: [queryKey, queryObject],
    queryFn: () => getdata<T>(url, search),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
    retry,
  });
}

export default useGetData;
