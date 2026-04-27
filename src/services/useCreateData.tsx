import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Request, SupportRequest } from "../libs/httpService";
import { showToastify } from "@/components/Headless/Toast";

type TCreateData<TRes> = {
  url: string;
  queryKey?: string | string[];
  showToast?: boolean;
  support?: boolean;
  onSuccess?: (data: TRes) => void;
  onError?: () => void;
  timeout?: number;
};

function useCreateData<TReq extends object, TRes>({
  url,
  queryKey,
  showToast = true,
  support = false,
  onSuccess,
  onError,
  timeout = 60 * 1000,
}: TCreateData<TRes>) {
  const queryClient = useQueryClient();
  const apiClient = support ? SupportRequest : Request;
  return useMutation({
    mutationFn: async (values: TReq) => {
      const { data } = await apiClient.post(url, values, { timeout });
      return data as TRes;
    },
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
