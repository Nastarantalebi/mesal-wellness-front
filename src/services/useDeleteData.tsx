import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Request } from "../libs/httpService";
import Toastify from "toastify-js";

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
        Toastify({
          text: "آیتم با موفقیت حذف شد",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "خطا در حذف آیتم";
      if (onError) {
        onError();
      } else {
        Toastify({
          text: message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      }
    },
  });
}

export default useDeleteData;
