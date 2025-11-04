import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toastify from "toastify-js";
import { Request } from "../libs/httpService";
import type { TCategory } from "../types";

type TCreateData<TRes> = {
  url: string;
  queryKey?: string;
  showToast?: boolean;
  onSuccess?: (data: TRes) => void;
  onError?: () => void;
  category: TCategory;
};

async function createdata<TReq extends object, TRes>(
  category: TCategory,
  url: string,
  values: TReq
) {
  const { data }: { data: TRes } = await Request.post(category, url, values);
  return data;
}

function useCreateData<TReq extends object, TRes>({
  url,
  queryKey,
  showToast = true,
  onSuccess,
  onError,
  category,
}: TCreateData<TRes>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TReq) => createdata<TReq, TRes>(category, url, values),

    onSuccess: (data: TRes) => {
      if (onSuccess) {
        onSuccess(data);
      } else {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        if (showToast)
          Toastify({
            text: "آیتم با موفقیت ساخته شد",
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
        if (showToast)
          Toastify({
            text: "خطا در ساخت آیتم",
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

export default useCreateData;
