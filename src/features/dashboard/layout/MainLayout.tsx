import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../stores/hooks";
import { selectCompactMenu } from "../../../stores/compactMenuSlice";
import SidebarWrapper from "./SidebarWrapper";
import { clsx } from "clsx";
import type { TSidebarMenu } from "../_types/types";
import useGetData from "@/services/useGetData";

function MainLayout() {
  const compactMenu = useAppSelector(selectCompactMenu);
  const { data } = useGetData<TSidebarMenu>({
    url: "basics/menus/sidebar",
    queryKey: "basics/menus/sidebar",
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return (
    <div
      className={clsx([
        "viper",
        "before:content-[''] before:z-[-1] before:w-screen before:bg-slate-50 before:top-0 before:h-screen before:fixed",
      ])}>
      <SidebarWrapper menus={data?.data?.menus} />

      <div
        className={clsx([
          "transition-[margin,width] duration-100 md:px-5 px-0.5 mt-[65px]  pb-16 relative z-10",
          { "xl:ms-[275px]": !compactMenu },
          { "xl:ms-[91px]": compactMenu },
        ])}>
        <div className="h-[81vh] p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
