import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "./authServices";
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
    onSuccess: (data) => {
      showToastify({
        message: data?.message || "به پنل کاربری خود وارد شدید",
        type: "success",
      });
      navigate("/");
    },
  });
  return { isPending, mutateAsync };
}

export default useLogin;
