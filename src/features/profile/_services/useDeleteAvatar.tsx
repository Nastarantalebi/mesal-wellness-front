import { deleteAvatar } from "@/features/auth/_services/authServices";
import { useMutation } from "@tanstack/react-query";
import Toastify from "toastify-js";
function useDeleteAvatar() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      Toastify({
        text: "پروفایل با موفیقت حذف شد ",
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

export default useDeleteAvatar;
