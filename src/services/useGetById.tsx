import { useQuery } from "@tanstack/react-query";
import { Request } from "../libs/httpService";

type TGetData = {
  url: string;
  queryKey: string;
  id?: number | string | null;
};

async function getdata<T>(url: string, id?: number | string | null) {
  const { data }: { data: T } = await Request.get(url + id + "/");
  return data;
}

function useGetById<T>({ url, queryKey, id }: TGetData) {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getdata<T>(url, id),
    enabled: !!id,
  });
}

export default useGetById;
