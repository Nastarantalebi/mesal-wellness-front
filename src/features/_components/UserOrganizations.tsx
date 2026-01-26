import {
  FilterIcon,
  Loader2,
  LogOutIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import Button from "@/components/Button";
import clsx from "clsx";
import { useAuthStore } from "@/features/auth/store/authStore";
import useCreateData from "@/services/useCreateData";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../auth/_services/useLogout";

function UserOrganizations() {
  const auth = useAuthStore((s) => s.auth);
  const { mutateAsync: logoutApi } = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const organizations = auth?.organizations ?? [];

  const filteredOrganizations = useMemo(() => {
    if (!search.trim()) return organizations;
    return organizations.filter((org) =>
      org.title.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [organizations, search]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutApi();
      window.location.replace("/login");
    } catch (error) {
      setIsLoggingOut(false);
    }
  };
  const fetchUserData = useAuthStore((s) => s.fetchUserData);

  const { mutate, isPending } = useCreateData({
    url: "basics/auth/user/",
    onSuccess: async () => {
      await fetchUserData();
      navigate("/");
    },
  });
  if (!auth) {
    window.location.replace("/login");
    return;
  }
  return (
    <div className="my-10 flex w-full justify-center">
      <div className="w-full max-w-[50rem] space-y-6">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="m-0 text-uiSecondary">
            لیست سازمان‌ها ({filteredOrganizations.length})
          </h1>

          <Button
            variant="outline-pending"
            size="sm"
            onClick={handleLogout}
            className="[&_svg]:size-6">
            {isLoggingOut ? (
              <Loader2 className="animate-spin" />
            ) : (
              <LogOutIcon />
            )}
          </Button>
        </div>

        {/* search */}
        <div>
          <div className="relative flex items-center rounded-md px-4 py-3 shadow shadow-primary/30">
            <SearchIcon className="flex-none opacity-50" />

            <input
              type="text"
              placeholder="جستجو در سازمان"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-transparent text-sm focus:border-transparent focus:outline-none"
            />

            {search.trim() && (
              <button
                onClick={() => setSearch("")}
                className="flex-none opacity-60 hover:opacity-90"
                aria-label="clear search">
                <XIcon className="size-5" />
              </button>
            )}

            <FilterIcon className="flex-none opacity-50" />
          </div>
        </div>

        {/* organizations list */}
        <div>
          <div
            className={clsx(
              "w-full rounded-md border border-primary/25 p-2 shadow shadow-primary/10 h-[calc(90vh-180px)] overflow-y-auto"
            )}>
            {filteredOrganizations.length > 0 ? (
              <div className="w-full grid gap-3">
                {filteredOrganizations.map((organization) => (
                  <div
                    key={organization.id}
                    className="flex flex-col gap-3 rounded-md bg-gray-20 p-4 shadow-sm border border-primary/10 md:flex-row md:items-center md:justify-between">
                    {/* اطلاعات سازمان */}
                    <div className="flex items-center gap-3">
                      {organization.thumb_logo ? (
                        <img
                          src={organization.thumb_logo}
                          alt={organization.title}
                          width={65}
                          height={65}
                          className="rounded-md"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                          {organization.title.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="flex flex-col gap-1 text-sm font-medium">
                        <p className="text-base font-semibold">
                          {organization.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          شناسه: {organization.id}
                        </p>
                      </div>
                    </div>

                    {/* دکمه ورود */}
                    <Button
                      color="primary"
                      type="button"
                      onClick={() =>
                        mutate({ organization_id: organization.id })
                      }
                      className="rounded-xl px-5 py-2 text-sm w-full md:w-48"
                      disabled={isPending}>
                      {isPending ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" />
                          در حال ورود...
                        </span>
                      ) : (
                        "ورود به سازمان"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                سازمانی وجود ندارد
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOrganizations;
