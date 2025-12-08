import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./authServices";
import type { IForgotPassword } from "../_types/types";
import Toastify from "toastify-js";
function useForgotPassWord() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: IForgotPassword) => {
      const response = await forgotPassword(values);
      return response;
    },
    onSuccess: (data) => {
      Toastify({
        text: data?.message || "رمز عبور جدید با موفقیت ایجاد شد",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    },
  });
  return { isPending, mutateAsync };
}

export default useForgotPassWord;
