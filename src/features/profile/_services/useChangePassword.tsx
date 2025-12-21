import { showToastify } from "@/components/Headless/Toast";
import { changePassword } from "@/features/auth/_services/authServices";
import { useMutation } from "@tanstack/react-query";
function useChangePassword() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      showToastify({
        message: "رمزعبور تغییر کرد",
        type: "success",
      });
    },
  });
  return { isPending, mutateAsync };
}

export default useChangePassword;
