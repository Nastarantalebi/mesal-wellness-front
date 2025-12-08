import { useMutation } from "@tanstack/react-query";
import Toastify from "toastify-js";
import { sendPassword } from "./authServices";
import { useNavigate } from "react-router-dom";
import type { ISendMobile } from "../_types/types";

function useSendPassword() {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ISendMobile) => {
      const response = await sendPassword(values);
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

export default useSendPassword;
