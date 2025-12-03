import { useMutation } from "@tanstack/react-query";
import { sendMobile } from "./authServices";
import Toastify from "toastify-js";
function useSendMobile() {
  const { isPending, mutateAsync, data } = useMutation({
    mutationFn: sendMobile,
    onSuccess: () => {
      Toastify({
        text: "کد یکبارمصرف برای شماره شما ارسال شد",
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
  return { isPending, mutateAsync, data };
}

export default useSendMobile;
