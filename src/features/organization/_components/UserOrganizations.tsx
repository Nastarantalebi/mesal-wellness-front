import useGetData from "@/services/useGetData";
import {
  FilterIcon,
  Loader2,
  LocateIcon,
  LogOutIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import type { TData, TResponse } from "../_types/type";
import Button from "@/components/Button";
import LoadingSpin from "@/components/Loading";
import clsx from "clsx";
import { logout } from "@/features/auth/_services/authServices";

function UserOrganizations() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      window.location.replace("/login");
    } catch (error) {
      setIsLoggingOut(false);
    }
  };
  const { data, isLoading } = useGetData<TResponse>({
    url: "basics/auth/user",
    queryKey: "basics/auth/user",
  });
  const [search, _setSearch] = useState<TData | undefined>(data?.data);

  const finalSearch = search || data?.data || [];
  return (
    <div className="my-10 flex w-full justify-center">
      <div className="w-full max-w-[50rem] space-y-6">
        <div className="flex justify-between">
          <h1 className="m-0 text-uiSecondary">لیست سازمان ها</h1>
          <Button
            variant="outline-pending"
            size="sm"
            onClick={() => handleLogout()}
            className="[&_svg]:size-6">
            {isLoggingOut ? (
              <Loader2 className="animate-spin" />
            ) : (
              <LogOutIcon />
            )}
          </Button>
        </div>

        <div>
          <div className="flex gap-2 rounded-md px-4 py-3 shadow shadow-primary/30">
            <SearchIcon className="flex-none opacity-50" />
            <input
              type="text"
              placeholder="جستجو در سازمان"
              // onChange={(e) => {
              //   const found = data?.data.filter((item) =>
              //     item.title.includes(e.target.value)
              //   );
              //   setSearch(found);
              // }}
              className="flex-1 border-transparent text-sm focus:border-transparent focus:outline-none"
            />
            <FilterIcon className="flex-none opacity-50" />
          </div>
        </div>
        <div>
          {isLoading ? (
            <LoadingSpin />
          ) : (
            <div
              className={clsx(
                "w-full rounded-md border border-primary/25 p-2 shadow shadow-primary/10 h-[calc(100vh-180px)] overflow-y-auto"
              )}>
              {finalSearch.length > 0 ? (
                <div
                  className={clsx("w-full grid gap-2", {
                    "md:grid-cols-2 lg:grid-cols-3": finalSearch.length > 3,
                  })}>
                  {finalSearch.map(({ organization }) => (
                    <div
                      key={organization.id}
                      className={clsx("rounded-md bg-gray-20 p-3 space-y-2", {
                        "md:flex justify-between": finalSearch.length < 4,
                        "grid min-h-40": finalSearch.length > 4,
                      })}>
                      <div className="flex items-center gap-2">
                        {organization.thumb_logo && (
                          <img
                            src={organization.thumb_logo}
                            className="h-fit"
                            alt={organization.title}
                            width={65}
                            height={65}
                          />
                        )}
                        <div className="flex flex-col gap-2 text-sm font-medium">
                          <p>{organization.title}</p>
                          <div className="flex items-center gap-2">
                            <LocateIcon width={18} height={18} />
                            <p className="text-gray-70">تهران</p>
                          </div>
                          {/* <p>
                            {t("organization_id")}: {id}
                          </p> */}
                        </div>
                      </div>
                      <Button
                        color="primary"
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("fiscal_year");
                        }}
                        className={clsx("rounded-xl px-5 py-1 text-sm w-48", {
                          "w-full self-end": finalSearch.length > 4,
                        })}>
                        {true ? "درحال ورود به سازمان" : "ورود به سازمان"}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>سازمانی وجود ندارد</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserOrganizations;
