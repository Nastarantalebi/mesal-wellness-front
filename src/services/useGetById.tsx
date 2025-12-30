import { useQuery } from "@tanstack/react-query";
import { Request } from "../libs/httpService";

type TGetData = {
  url: string;
  queryKey: string | string[];
  id?: number | string | null;
  enabled?: boolean;
};

async function getdata<T>(url: string, id?: number | string | null) {
  const { data }: { data: T } = await Request.get(id ? url + id + "/" : url);
  return data;
}

function useGetById<T>({ url, queryKey, id, enabled = !!id }: TGetData) {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getdata<T>(url, id),
    enabled,
    refetchOnWindowFocus: false,
  });
}

export default useGetById;
