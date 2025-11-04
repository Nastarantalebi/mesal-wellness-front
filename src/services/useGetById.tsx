import { useQuery } from "@tanstack/react-query";
import { Request } from "../libs/httpService";
import type { TCategory } from "../types";

type TGetData = {
  url: string;
  queryKey: string;
  id?: number | string | null;
  category: TCategory;
};

async function getdata<T>(
  category: TCategory,
  url: string,
  id?: number | string | null
) {
  const { data }: { data: T } = await Request.get(category, url + id + "/");
  return data;
}

function useGetById<T>({ category, url, queryKey, id }: TGetData) {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getdata<T>(category, url, id),
    enabled: !!id,
  });
}

export default useGetById;
