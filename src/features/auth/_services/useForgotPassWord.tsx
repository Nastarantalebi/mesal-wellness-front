import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./authServices";
import type { IForgotPassword } from "../_types/types";
import { showToastify } from "@/components/Headless/Toast";
function useForgotPassWord() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: IForgotPassword) => {
      const response = await forgotPassword(values);
      return response;
    },
    onSuccess: (data) => {
      showToastify({
        message: data?.message || "رمزعبور جدید ایجاد شد",
        type: "success",
      });
    },
  });
  return { isPending, mutateAsync };
}

export default useForgotPassWord;
