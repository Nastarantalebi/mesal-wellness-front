import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Request } from "../libs/httpService";
import { showToastify } from "@/components/Headless/Toast";

type TUpdateData = {
  url: string;
  queryKey?: string | string[];
  id?: number | string | null;
  showToast?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  timeout?: number;
};

export async function updateCase<TReq extends object, TRes>(
  url: string,
  values: TReq,
  id?: number | string | null,
  timeout?: number,
) {
  const finalUrl = id != null ? `${url}${id}/` : url;
  const { data }: { data: TRes } = await Request.put(finalUrl, values, {
    timeout,
  });
  return data;
}

function useUpdateData<TReq extends object, TRes>({
  url,
  queryKey,
  id,
  showToast = true,
  onSuccess,
  onError,
  timeout,
}: TUpdateData) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TReq) =>
      updateCase<TReq, TRes>(url, values, id, timeout),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      } else {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        if (showToast)
          showToastify({
            message: "آیتم ویرایش شد",
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

export default useUpdateData;
