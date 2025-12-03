import { useMutation } from "@tanstack/react-query";
import Toastify from "toastify-js";
import { forgotPassword } from "./authServices";

function useForgotPassWord() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      Toastify({
        text: "رمز عبور جدید با موفقیت ایجاد شد",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    },
    onError: (e: Error) => {
      Toastify({
        text: e.message || "خطایی رخ داد لطفا دوباره وارد شوید",
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
