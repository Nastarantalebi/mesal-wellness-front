import { useMutation } from "@tanstack/react-query";
import Toastify from "toastify-js";
import { sendPassword } from "./authServices";
import { useNavigate } from "react-router-dom";

function useSendPassword() {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: sendPassword,
    onSuccess: () => {
      Toastify({
        text: "با موفقیت به پنل کاربری خود وارد شدید",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      navigate("/");
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

export default useSendPassword;
