import { useMutation } from "@tanstack/react-query";
import { authenticate, login as loginApi } from "./authServices";
import { useNavigate } from "react-router-dom";
import type { ISendOTP } from "../_types/types";
import { showToastify } from "@/components/Headless/Toast";

function useLogin() {
  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ISendOTP) => {
      const response = await loginApi(values);
      return response;
    },
    onSuccess: async (data) => {
      const auth = await authenticate();
      if (auth.code === 200) {
        showToastify({
          message: data?.message || "به پنل کاربری خود وارد شدید",
          type: "success",
        });
        navigate("/");
      } else {
        navigate("/user-not-found");
      }
    },
  });
  return { isPending, mutateAsync };
}

export default useLogin;
