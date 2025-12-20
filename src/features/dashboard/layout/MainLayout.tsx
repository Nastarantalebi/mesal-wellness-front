import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../stores/hooks";
import { selectCompactMenu } from "../../../stores/compactMenuSlice";
import SidebarWrapper from "./SidebarWrapper";
import { clsx } from "clsx";

function MainLayout() {
  const compactMenu = useAppSelector(selectCompactMenu);

  return (
    <div
      className={clsx([
        "viper",
        "before:content-[''] before:z-[-1] before:w-screen before:bg-slate-50 before:top-0 before:h-screen before:fixed",
      ])}>
      <SidebarWrapper />

      <div
        className={clsx([
          "transition-[margin,width] duration-100 md:px-5 px-0.5 mt-[65px] pt-[31px] pb-16 relative z-10",
          { "xl:ms-[275px]": !compactMenu },
          { "xl:ms-[91px]": compactMenu },
        ])}>
        <div className=" p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
