import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "./authServices";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import type { ISendOTP } from "../_types/types";

function useLogin() {
  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ISendOTP) => {
      const response = await loginApi(values);
      return response;
    },
    onSuccess: (data) => {
      Toastify({
        text: data?.message || "با موفقیت به پنل کاربری خود وارد شدید",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      navigate("/");
    },
  });
  return { isPending, mutateAsync };
}

export default useLogin;
