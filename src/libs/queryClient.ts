import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Toastify from "toastify-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleHttpError = (error: any) => {
  const status = error?.response?.status;
  const data = error?.response?.data;

  const message = data?.message ?? error.message;
  const errors = data?.errors;

  // ساخت پیام کامل
  let fullMessage = message;

  if (errors && typeof errors === "object") {
    const flatErrors = Object.values(errors).flat(); // تبدیل {file:[...]} به آرایه ساده

    if (flatErrors.length > 0) {
      fullMessage += "\n" + flatErrors.join("\n");
    }
  }

  Toastify({
    text: fullMessage,
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

  if (status === 401) {
    Cookies.remove("access_token");
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
