import { useMutation } from "@tanstack/react-query";
import type { ISendMobile } from "../_types/types";
import { sendPassword } from "./authServices";
import { useAuthHelper } from "../_hooks/useAuthHelper";
function useSendPassword() {
  const { authHelper } = useAuthHelper();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (values: ISendMobile) => {
      const response = await sendPassword(values);
      return response;
    },
    onSuccess: (data) => {
      authHelper({ showToast: true, data });
    },
  });
  return { isPending, mutateAsync };
}

export default useSendPassword;
