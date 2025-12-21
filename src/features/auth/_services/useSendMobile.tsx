import { useMutation } from "@tanstack/react-query";
import { sendMobile } from "./authServices";
import type { ISendMobile } from "../_types/types";
import { showToastify } from "@/components/Headless/Toast";
function useSendMobile() {
  const { isPending, mutateAsync, data } = useMutation({
    mutationFn: async (values: ISendMobile) => {
      const response = await sendMobile(values);
      return response;
    },
    onSuccess: (data) => {
      showToastify({
        message: data?.message || "کد یکبارمصرف برای شما ارسال شد",
        type: "success",
      });
    },
  });
  return { isPending, mutateAsync, data };
}

export default useSendMobile;
