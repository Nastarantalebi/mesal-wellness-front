import Button from "@/components/Button";
import searchImg from "/Search engines-bro.svg";
import clsx from "clsx";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { useLogout } from "../auth/_services/useLogout";

function UserNotFound() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { mutateAsync: logoutApi } = useLogout();
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutApi().then(() => {
        // window.location.replace("/login");
      });
    } catch (error) {
      setIsLoggingOut(false);
    }
  };
  // const userData = useAuthStore((s) => s.userData);
  // if (userData) return <Navigate to="/dashboard" replace />;
  return (
    <div>
      <div className="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:ps-14 lg:pe-12 xl:px-24">
        <div
          className={clsx([
            "relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:ps-10 lg:col-span-5 xl:ps-24 2xl:col-span-4 lg:p-0",
            "before:content-[''] before:absolute before:inset-0 before:-mb-3.5 before:bg-white/40 before:rounded-2xl before:mx-5",
          ])}
        >
          <div className="relative z-10 flex flex-col justify-center gap-6 w-full h-full py-2 lg:py-32">
            <Button
              variant="outline-primary"
              className="flex gap-2 w-fit self-end"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  در حال خروج... <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  خروج <LogOut className="h-4 w-4" />
                </>
              )}
            </Button>
            <p className="font-bold">هیچ سازمانی برای شما یافت نشد!</p>
            <p>برای ورود با شماره همراه جدید دکمه خروج را بزنید.</p>
            <p>برای استفاده از سایت با همین شماره همراه، عضو یک سازمان شوید.</p>
            <div className="flex gap-4 justify-end">
              {/* <Button>ایجاد سازمان</Button> */}
              <Button
                variant="outline-primary"
                className="border-primary text-primary"
              >
                ورود به نسخه دمو
              </Button>
            </div>
            <p className="mt-12">تماس با پشتیبانی</p>
          </div>
        </div>
      </div>
      <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] ps-14 pe-12 xl:px-24">
        <div
          className={clsx([
            "relative h-screen col-span-12 lg:col-span-6 2xl:col-span-5 z-20",
            "after:bg-white after:hidden after:lg:block after:content-[''] after:absolute after:end-0 after:inset-y-0 after:bg-gradient-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] rtl:rounded-[1.2rem_0_0_1.2rem/1.7rem_0_0_1.7rem]",
            "before:content-[''] before:hidden before:lg:block before:absolute before:end-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-me-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] rtl:rounded-[1.2rem_0_0_1.2rem/1.7rem_0_0_1.7rem]",
          ])}
        ></div>
        <div
          className={clsx([
            "h-full col-span-6 2xl:col-span-7 lg:relative",
            "before:content-[''] before:absolute before:lg:-ms-10 before:start-0 before:inset-y-0 before:bg-gradient-to-b before:from-primary-20/80 before:to-gray-30/80 before:w-screen before:lg:w-[800%]",
            "after:content-[''] after:absolute after:inset-y-0 after:start-0 after:w-screen after:lg:w-[800%] after:bg-white/10 after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat",
          ])}
        >
          <div className="sticky top-0 z-10 flex-col justify-center items-end hidden h-screen ms-16 lg:flex xl:ms-28 2xl:ms-36">
            <img
              src={searchImg}
              alt="not found user"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNotFound;
