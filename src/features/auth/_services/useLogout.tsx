import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { logout } from "./authServices";
import useAuthState from "../store/authState";

export function useLogout() {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      // حذف توکن FCM
      // if (fcmToken) {
      //   await removeFcmToken(fcmToken);
      // }
      // لاگ اوت از سرور
      await logout();
      return true;
    },
    onSuccess: () => {
      useAuthState.getState().logout();
      localStorage.clear();
      Toastify({
        text: "از حساب کاربری خود خارج شدید",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      navigate("/login", { replace: true });
    },
    onError: () => {
      Toastify({
        text: "مشکلی در خروج پیش آمد",
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
