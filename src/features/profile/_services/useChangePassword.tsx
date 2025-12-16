import { changePassword } from "@/features/auth/_services/authServices";
import { useMutation } from "@tanstack/react-query";
import Toastify from "toastify-js";
function useChangePassword() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      Toastify({
        text: "رمز عبور با موفقیت تغییر کرد",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    },
  });
  return { isPending, mutateAsync };
}

export default useChangePassword;
