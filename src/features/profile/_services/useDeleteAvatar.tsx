import { showToastify } from "@/components/Headless/Toast";
import { deleteAvatar } from "@/features/auth/_services/authServices";
import { useMutation } from "@tanstack/react-query";
function useDeleteAvatar() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      showToastify({
        message: "پروفایل حذف شد",
        type: "success",
      });
    },
  });
  return { isPending, mutateAsync };
}

export default useDeleteAvatar;
