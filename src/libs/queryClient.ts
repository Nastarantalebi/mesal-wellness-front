import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Toastify from "toastify-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleHttpError = (error: any) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message ?? error.message;

  switch (status) {
    case 401:
      Toastify({
        text: message || "لطفاً ابتدا وارد شوید.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      Cookies.remove("access_token");
      break;
    case 500:
      Toastify({
        text: message || "خطای سرور رخ داده است.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      break;
    default:
      Toastify({
        text: message || "خطا در ارتباط با سرور.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
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
