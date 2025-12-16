import { changeAvatar } from "@/features/auth/_services/authServices";
import { useMutation } from "@tanstack/react-query";
import Toastify from "toastify-js";
function useChangeAvatar() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: changeAvatar,
    onSuccess: () => {
      Toastify({
        text: "پروفایل با موفیقت تغییر کرد",
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

export default useChangeAvatar;
