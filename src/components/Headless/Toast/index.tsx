import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

interface ToastProps {
  message: string;
  duration?: number;
  type?: "error" | "success" | "info";
}

const backgroundMap = {
  error: "linear-gradient(90deg,#ef4444,#dc2626)",
  success: "linear-gradient(90deg,#10b981,#059669)",
  info: "linear-gradient(90deg,#3b82f6,#2563eb)",
};

export const showToastify = ({
  message,
  duration = 3000,
  type = "error",
}: ToastProps) => {
  Toastify({
    text: message,
    duration,
    gravity: "top",
    position: "center",
    close: false,
    stopOnFocus: true,
    style: {
      background: backgroundMap[type],
      color: "#fff",
      fontSize: "14px",
      borderRadius: "8px",
      padding: "12px 16px",
      direction: "rtl",
    },
  }).showToast();
};
