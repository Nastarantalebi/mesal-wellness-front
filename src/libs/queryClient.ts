import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { showToastify } from "@/components/Headless/Toast";

let isRedirecting = false;
const handleHttpError = (error: any) => {
  if (isRedirecting) return;
  const redirectUrl = import.meta.env.VITE_REDIRECT_ORG_URL;
  const redirect = `${redirectUrl}?redirect=${window.location.href}`;
  // const redirect = `${redirectUrl}?redirect=${encodeURIComponent(window.location.href)}`;

  const status = error?.response?.status;
  const code = error?.response?.data?.code;
  const message = error?.response?.data?.message ?? error.message;

  // timeout
  // if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
  //   showToastify({
  //     message: "پاسخی از سرور دریافت نشد.",
  //     type: "error",
  //   });
  //   return;
  // }
  // if (!error.response || error.code === "ERR_NETWORK") {
  //   showToastify({
  //     message: "عدم اتصال به اینترنت",
  //     type: "error",
  //   });
  //   return;
  // }

  console.log(status);

  // let errorMessage =
  //   error?.response?.data?.message ||
  //   error?.response?.data?.error ||
  //   error?.response?.data?.detail ||
  //   error?.message ||
  //   "خطای ناشناخته‌ای رخ داده است";

  // if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
  //   showToastify({
  //     message: "پاسخی از سرور دریافت نشد.لطفا دوباره تلاش کنید",
  //     type: "error",
  //   });
  //   return;
  // }
  // if (!error.response) {
  //   showToastify({
  //     message: "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
  //     type: "error",
  //   });
  //   return;
  // }
  switch (status) {
    case 403:
    case 400: {
      const data = error?.response?.data;
      console.log("data:", error);
      const hasBody = data && typeof data === "object";
      if (hasBody && code && code === "org_not_selected") {
        isRedirecting = true;
        localStorage.clear();
        window.location.replace(redirect);
      } else {
        showToastify({
          message,
          type: "error",
        });
        setTimeout(() => {
          window.location.replace(redirect);
        }, 2000);
      }
      break;
    }
    // case 401:
    //   if (error?.response?.data?.code === "USER_NOT_FOUND") {
    //     showToastify({
    //       message: "کاربر وارد شده در این سامانه وجود ندارد",
    //       type: "error",
    //     });
    //   } else {
    //     // showToastify({
    //     //   message: message || "لطفاً ابتدا وارد شوید.",
    //     //   type: "error",
    //     // });
    //   }
    //   break;
    case 404:
      throw error;
    case 429:
      showToastify({
        message:
          "درخواست‌ها بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید",
        type: "error",
      });
      break;
    case 500:
      showToastify({
        message: "خطای سرور رخ داده است.",
        type: "error",
      });
      break;
    case 503:
    case 521:
      showToastify({
        message: "سرویس در دسترس نیست لطفا بعدا تلاش کنید",
        type: "error",
      });
      break;
    default:
      throw new Error("خطایی رخ داده است.");
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
