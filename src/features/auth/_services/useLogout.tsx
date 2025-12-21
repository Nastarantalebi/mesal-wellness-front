import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "./authServices";
import useAuthState from "../store/authState";
import { showToastify } from "@/components/Headless/Toast";

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
      showToastify({
        message: data?.message || "از حساب کاربری خود خارج شدید",
        type: "success",
      });
    },
    onError: (error: any) => {
      const msg =
        error?.message ||
        error?.response?.data?.message ||
        "مشکلی در خروج پیش آمد";
      showToastify({
        message: msg,
        type: "error",
      });
    },
  });

  return { isPending, mutateAsync };
}
