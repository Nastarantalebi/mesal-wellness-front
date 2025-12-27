import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { showToastify } from "@/components/Headless/Toast";

const handleHttpError = (error: any) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message ?? error.message;
  let errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.detail ||
    error?.message ||
    "خطای ناشناخته‌ای رخ داده است";

  if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
    showToastify({
      message: "پاسخی از سرور دریافت نشد.لطفا دوباره تلاش کنید",
      type: "error",
    });
    return;
  }
  if (!error.response) {
    showToastify({
      message: "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
      type: "error",
    });
    return;
  }
  switch (status) {
    case 401:
      if (error?.response?.data?.code === "USER_NOT_FOUND") {
        showToastify({
          message: "کاربر وارد شده در این سامانه وجود ندارد",
          type: "error",
        });
      } else {
        showToastify({
          message: message || "لطفاً ابتدا وارد شوید.",
          type: "error",
        });
      }
      break;
    case 404:
      break;
    case 429:
      showToastify({
        message:
          "درخواست‌ها بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید",
        type: "error",
      });
      break;
    case 500:
      showToastify({
        message: message || "خطای سرور رخ داده است.",
        type: "error",
      });
      break;
    case 503:
      showToastify({
        message: "سرویس در دسترس نیست",
        type: "error",
      });
      break;
    default:
      if (Array.isArray(error?.response?.data?.non_field_errors)) {
        errorMessage = error.response.data.non_field_errors.join("، ");
      }
      showToastify({
        message: errorMessage,
        type: "error",
      });
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
