import { useMutation } from "@tanstack/react-query";
import { authenticate, login } from "./authServices";
import { useNavigate } from "react-router-dom";
import type { ISendOTP } from "../_types/types";
import { showToastify } from "@/components/Headless/Toast";
import { useAuthStore } from "../store/authStore";

function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ISendOTP) => {
      const response = await login(values);
      return response;
    },
    onSuccess: async (data) => {
      const auth = await authenticate();
      if (auth.code === 200) {
        setAuth(auth);
        showToastify({
          message: data?.message || "به پنل کاربری خود وارد شدید",
          type: "success",
        });
        navigate("/user-organizations");
      } else {
        navigate("/user-not-found");
      }
    },
  });
  return { isPending, mutateAsync };
}

export default useLogin;
