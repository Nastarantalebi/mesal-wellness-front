import clsx from "clsx";
import CustomTabs from "@/components/Headless/Tab/CustomTab";
import useTabItems from "../_hooks/useTabItems";
import { useEffect, useState } from "react";
import { plainInstance } from "@/libs/axios";
import LoadingSpin from "@/components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useAuthHelper } from "../_hooks/useAuthHelper";
function Login() {
  const { tabItems } = useTabItems();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const organizationId = useAuthStore((s) => s.userData?.organization.id);
  const { authHelper } = useAuthHelper();
  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const res = await plainInstance.post("/refresh/");
        if (res.status !== 200) return;
        // اگر سازمان داریم مستقیم برو
        if (organizationId) {
          navigate("/dashboard", { replace: true });
          return;
        }
        // وگرنه احراز هویت کامل
        authHelper({ showToast: false });
      } catch (err) {
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [organizationId, navigate]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpin />
      </div>
    );
  }
  return (
    <>
      <div className="container grid lg:h-full grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-1.5 sm:py-14 sm:px-4 md:px-36 lg:py-0 lg:ps-14 lg:pe-12 xl:px-24">
        <div
          className={clsx([
            "relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:pe-10 lg:col-span-5 xl:pe-24 2xl:col-span-4 lg:p-0",
            "before:content-[''] before:absolute before:inset-0 before:-mb-3.5 before:bg-white/40 before:rounded-2xl before:mx-5",
          ])}>
          <div className="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32">
            <div className="mt-10">
              <div className="text-2xl font-medium text-center my-3">
                ورود به حساب کاربری
              </div>
              <CustomTabs items={tabItems} title="ورود" />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] ps-14 pe-12 xl:px-24">
        <div
          className={clsx([
            "relative h-screen col-span-12 lg:col-span-6 2xl:col-span-5 z-20",
            "after:bg-white after:hidden after:lg:block after:content-[''] after:absolute after:end-0 after:inset-y-0 after:bg-gradient-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] rtl:rounded-[1.2rem_0_0_1.2rem/1.7rem_0_0_1.7rem]",
            "before:content-[''] before:hidden before:lg:block before:absolute before:end-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-me-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] rtl:rounded-[1.2rem_0_0_1.2rem/1.7rem_0_0_1.7rem]",
          ])}></div>
        <div
          className={clsx([
            "h-full col-span-6 2xl:col-span-7 lg:relative",
            "before:content-[''] before:absolute before:lg:-ms-10 before:start-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1/50 before:to-theme-2/50 before:w-screen before:lg:w-[800%]",
            "after:content-[''] after:absolute after:inset-y-0 after:start-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat",
          ])}>
          <div className="sticky top-0 z-10 flex-col justify-center items-end hidden h-screen ms-16 lg:flex xl:ms-28 2xl:ms-36">
            <img
              alt="login-pic"
              src="/women in hair salon-pana.svg"
              className="w-3/4"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
