import { useMutation } from "@tanstack/react-query";
import { authenticate, sendPassword } from "./authServices";
import { useNavigate } from "react-router-dom";
import type { ISendMobile } from "../_types/types";
import { showToastify } from "@/components/Headless/Toast";

function useSendPassword() {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ISendMobile) => {
      const response = await sendPassword(values);
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

export default useSendPassword;
