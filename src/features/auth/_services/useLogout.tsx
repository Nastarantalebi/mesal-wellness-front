import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { logout } from "./authServices";
import useAuthState from "../store/authState";

export function useLogout() {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await logout();
      return response;
    },
    onSuccess: (data) => {
      useAuthState.getState().logout();
      localStorage.clear();
      navigate("/login", { replace: true });
      Toastify({
        text: data?.message || "از حساب کاربری خود خارج شدید",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    },
    onError: (error: any) => {
      const msg =
        error?.message ||
        error?.response?.data?.message ||
        "مشکلی در خروج پیش آمد";
      Toastify({
        text: msg,
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
