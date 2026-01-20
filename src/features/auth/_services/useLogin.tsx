import { useMutation } from "@tanstack/react-query";
import { login } from "./authServices";
import type { ISendOTP } from "../_types/types";
import { useAuthHelper } from "../_hooks/useAuthHelper";

function useLogin() {
  const { authHelper } = useAuthHelper();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ISendOTP) => {
      const response = await login(values);
      return response;
    },
    onSuccess: (data) => {
      authHelper({ showToast: true, data });
    },
  });
  return { isPending, mutateAsync };
}

export default useLogin;
