import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Request } from "../libs/httpService";
import type { TCategory } from "../types";

type TGetData = { url: string; queryKey: string; category: TCategory };

async function getdata<T>(category: TCategory, url: string, qs?: string) {
  const { data }: { data: T } = await Request.get(category, url + qs);
  return data;
}

function useGetData<T>({ category, url, queryKey }: TGetData) {
  const { search } = useLocation();

  const queryObject = Object.fromEntries(new URLSearchParams(search));

  return useQuery({
    queryKey: [queryKey, queryObject],
    queryFn: () => getdata<T>(category, url, search),
    refetchOnWindowFocus: false,
  });
}

export default useGetData;
