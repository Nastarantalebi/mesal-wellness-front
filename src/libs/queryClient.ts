import Toastify from "toastify-js";
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

const handleHttpError = (error: any) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message ?? error.message;
  let errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.detail ||
    error?.message ||
    "خطای ناشناخته‌ای رخ داده است";
  switch (status) {
    case 401:
      Toastify({
        text: message || "لطفاً ابتدا وارد شوید.",
        duration: 5000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(90deg,#ef4444,#dc2626)",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px 16px",
          direction: "rtl",
        },
      }).showToast();
      break;
    case 429:
      Toastify({
        text:
          message ||
          "آیپی شما به دلیل ارسال درخواست زیاد محدود شده است. لطفاً دقایقی دیگر تلاش کنید.",
        duration: 5000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(90deg,#ef4444,#dc2626)",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px 16px",
          direction: "rtl",
        },
      }).showToast();
      break;
    case 500:
      Toastify({
        text: message || "خطای سرور رخ داده است.",
        duration: 5000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(90deg,#ef4444,#dc2626)",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px 16px",
          direction: "rtl",
        },
      }).showToast();
      break;
    default:
      if (Array.isArray(error?.response?.data?.non_field_errors)) {
        errorMessage = error.response.data.non_field_errors.join("، ");
      }
      Toastify({
        text: errorMessage,
        duration: 5000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(90deg,#ef4444,#dc2626)",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
          padding: "12px 16px",
          direction: "rtl",
        },
      }).showToast();
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
  queryCache: new QueryCache({
    onError: handleHttpError, // برای useQuery
  }),
  mutationCache: new MutationCache({
    onError: handleHttpError, // برای useMutation
  }),
});
