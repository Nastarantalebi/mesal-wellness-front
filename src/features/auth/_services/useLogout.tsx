import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "./authServices";
import { showToastify } from "@/components/Headless/Toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await logout();
      return response;
    },
    onSuccess: async (data) => {
      localStorage.clear();
      queryClient.clear();
      navigate("/login", { replace: true });
      showToastify({
        message: data?.message || "از حساب کاربری خود خارج شدید",
        type: "success",
      });
    },
  });

  return { isPending, mutateAsync };
}
