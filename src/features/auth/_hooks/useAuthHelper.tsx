import { showToastify } from "@/components/Headless/Toast";
import { authenticate } from "../_services/authServices";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

type TProps = {
  showToast: boolean;
  data?: any;
};

export const useAuthHelper = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const authHelper = async ({ showToast, data }: TProps) => {
    const auth = await authenticate();
    if (auth?.code === 200) {
      setAuth(auth);

      showToast &&
        showToastify({
          message: data?.message || "به پنل کاربری خود وارد شدید",
          type: "success",
        });
      navigate("/user-organizations");
    } else {
      navigate("/user-not-exist");
    }
  };

  return { authHelper };
};
