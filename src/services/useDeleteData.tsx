import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Request } from "../libs/httpService";
import Toastify from "toastify-js";
import type { TCategory } from "../types";

type TDeleteData = {
  url: string;
  queryKey?: string;
  onSuccess?: () => void;
  onError?: () => void;
  category: TCategory;
};

export async function deleteData<T>(
  category: TCategory,
  url: string,
  id: number | string
) {
  const { data }: { data: T } = await Request.delete(category, url + id + "/");
  return data;
}

function useDeleteData<T>({
  category,
  url,
  queryKey,
  onError,
  onSuccess,
}: TDeleteData) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteData<T>(category, url, id),

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
    onError: () => {
      if (onError) {
        onError();
      } else {
        Toastify({
          text: "خطا در حذف آیتم",
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
