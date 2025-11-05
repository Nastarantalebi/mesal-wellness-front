import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Request } from "../libs/httpService";

type TGetData = { url: string; queryKey: string };

async function getdata<T>(url: string, qs?: string) {
  const { data }: { data: T } = await Request.get(url + qs);
  return data;
}

function useGetData<T>({ url, queryKey }: TGetData) {
  const { search } = useLocation();

  const queryObject = Object.fromEntries(new URLSearchParams(search));

  return useQuery({
    queryKey: [queryKey, queryObject],
    queryFn: () => getdata<T>(url, search),
    refetchOnWindowFocus: false,
  });
}

export default useGetData;
