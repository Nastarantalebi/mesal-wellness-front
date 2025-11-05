import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Request } from "../libs/httpService";
import Toastify from "toastify-js";

type TUpdateData = {
  url: string;
  queryKey?: string;
  id?: number | string | null;
  showToast?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
};

export async function updateCase<TReq extends object, TRes>(
  url: string,
  values: TReq,
  id?: number | string | null
) {
  const { data }: { data: TRes } = await Request.put(url + id + "/", values);
  return data;
}

function useUpdateData<TReq extends object, TRes>({
  url,
  queryKey,
  id,
  showToast = true,
  onSuccess,
  onError,
}: TUpdateData) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TReq) =>
      updateCase<TReq, TRes>( url, values, id),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      } else {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        if (showToast)
          Toastify({
            text: "آیتم با موفقیت ویرایش شد",
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
            text: "خطا در ویرایش آیتم",
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

export default useUpdateData;
