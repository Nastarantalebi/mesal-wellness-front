import { FilterIcon, Loader2, LogOutIcon, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "@/components/Button";
import clsx from "clsx";
import { logout } from "@/features/auth/_services/authServices";
import { useAuthStore } from "@/features/auth/_services/authStore";
import useCreateData from "@/services/useCreateData";
import { useNavigate } from "react-router-dom";

function UserOrganizations() {
  const auth = useAuthStore((s) => s.auth);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const organizations = auth?.data?.organizations ?? [];
  const filteredOrganizations = useMemo(() => {
    if (!search.trim()) return organizations;
    return organizations.filter((org) =>
      org.title.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [organizations, search]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      window.location.replace("/login");
    } catch (error) {
      setIsLoggingOut(false);
    }
  };
  const { mutate, isPending } = useCreateData({
    url: "basics/auth/user/",
    onSuccess: () => {
      navigate("/");
    },
  });
  return (
    <div className="my-10 flex w-full justify-center">
      <div className="w-full max-w-[50rem] space-y-6 ">
        <div className="flex justify-between">
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

        <div>
          <div className="flex gap-2 rounded-md px-4 py-3 shadow shadow-primary/30">
            <SearchIcon className="flex-none opacity-50" />

            <input
              type="text"
              placeholder="جستجو در سازمان"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-transparent text-sm focus:border-transparent focus:outline-none"
            />

            <FilterIcon className="flex-none opacity-50" />
          </div>
        </div>

        <div>
          <div
            className={clsx(
              "w-full rounded-md border border-primary/25 p-2 shadow shadow-primary/10 h-[calc(90vh-180px)] overflow-y-auto"
            )}>
            {filteredOrganizations.length > 0 ? (
              <div
                className={clsx("w-full grid gap-2", {
                  "md:grid-cols-2 lg:grid-cols-3":
                    filteredOrganizations.length > 3,
                })}>
                {filteredOrganizations.map((organization) => (
                  <div
                    key={organization.id}
                    className={clsx("rounded-md bg-gray-20 p-3 space-y-2", {
                      "md:flex justify-between":
                        filteredOrganizations.length < 4,
                      "grid min-h-40": filteredOrganizations.length > 4,
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
                      </div>
                    </div>

                    <Button
                      color="primary"
                      type="button"
                      onClick={() =>
                        mutate({ organization_id: organization.id })
                      }
                      className={clsx("rounded-xl px-5 py-1 text-sm w-48", {
                        "w-full self-end": filteredOrganizations.length > 4,
                      })}>
                      ورود به سازمان
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>سازمانی وجود ندارد</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOrganizations;
