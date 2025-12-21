import { showToastify } from "@/components/Headless/Toast";
import { changeAvatar } from "@/features/auth/_services/authServices";
import { useMutation } from "@tanstack/react-query";
function useChangeAvatar() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: changeAvatar,
    onSuccess: () => {
      showToastify({
        message: "پروفایل تغییر کرد",
        type: "success",
      });
    },
  });
  return { isPending, mutateAsync };
}

export default useChangeAvatar;
