import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Request } from "../libs/httpService";
import { showToastify } from "@/components/Headless/Toast";

type TDeleteData = {
  url: string;
  queryKey?: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export async function deleteData<T>(url: string, id: number | string) {
  const { data }: { data: T } = await Request.delete(url + id + "/");
  return data;
}

function useDeleteData<T>({ url, queryKey, onError, onSuccess }: TDeleteData) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteData<T>(url, id),

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      } else {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        showToastify({
          message: "آیتم حذف شد",
          type: "success",
        });
      }
    },
    onError: () => {
      if (onError) {
        onError();
      }
    },
  });
}

export default useDeleteData;
