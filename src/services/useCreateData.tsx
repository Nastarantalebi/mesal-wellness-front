import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Request } from "../libs/httpService";
import { showToastify } from "@/components/Headless/Toast";

type TCreateData<TRes> = {
  url: string;
  queryKey?: string;
  showToast?: boolean;
  onSuccess?: (data: TRes) => void;
  onError?: () => void;
};

async function createdata<TReq extends object, TRes>(
  url: string,
  values: TReq
) {
  const { data }: { data: TRes } = await Request.post(url, values);
  return data;
}

function useCreateData<TReq extends object, TRes>({
  url,
  queryKey,
  showToast = true,
  onSuccess,
  onError,
}: TCreateData<TRes>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TReq) => createdata<TReq, TRes>(url, values),

    onSuccess: (data: TRes) => {
      if (onSuccess) {
        onSuccess(data);
      } else {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        if (showToast)
          showToastify({
            message: "آیتم ساخته شد",
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

export default useCreateData;
