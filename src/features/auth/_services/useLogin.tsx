import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "./authServices";
import Cookies from "js-cookie";
import type { ILoginResponse } from "../_types/types";
import Toastify from "toastify-js";

function useLogin() {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: login,
    onSuccess: (data: ILoginResponse) => {
      Toastify({
        text: "با موفقیت به پنل کاربری خود وارد شدید",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();

      Cookies.set("access_token", data.data.token, {
        secure: true,
        sameSite: "Strict",
      });

      // Cookies.set("refresh_token", data.refresh, {
      //   secure: true,
      //   sameSite: "Strict",
      // });

      navigate("/", { replace: true });
    },
    onError: () => {
      Toastify({
        text: "خطایی رخ داد لطفا دوباره وارد شوید",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();

      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    },
  });
  return { isPending, mutateAsync };
}

export default useLogin;
