import Lucide from "../../../components/Lucide";
import clsx from "clsx";
import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../../../stores/hooks";
import { selectCompactMenu } from "../../../stores/compactMenuSlice";

function SidebarWrapper({ topBarActive }: { topBarActive: boolean }) {
  const compactMenu = useAppSelector(selectCompactMenu);

  const [compactMenuOnHover, setCompactMenuOnHover] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  return (
    <div
      data-active={activeMobileMenu}
      className={clsx([
        "xl:ms-0 shadow-xl transition-[margin,padding] duration-300 xl:shadow-none fixed top-0 start-0 z-50 side-menu group inset-y-0 xl:py-3.5 xl:ps-3.5",
        "after:content-[''] after:fixed after:inset-0 after:bg-black/80 after:xl:hidden",
        { "side-menu--collapsed": compactMenu },
        { "side-menu--on-hover": compactMenuOnHover },
        { "ms-0 after:block": activeMobileMenu },
        { "-ms-[275px] after:hidden": !activeMobileMenu },
      ])}
    >
      {/* Close Button for Mobile */}
      <div
        className={clsx([
          "fixed ms-[275px] w-10 h-10 items-center justify-center xl:hidden z-50",
          { flex: activeMobileMenu },
          { hidden: !activeMobileMenu },
        ])}
      >
        <a
          href=""
          onClick={(event) => {
            event.preventDefault();
            setActiveMobileMenu(false);
          }}
          className="mt-5 ms-5"
        >
          <Lucide icon="X" className="w-8 h-8 text-white" />
        </a>
      </div>

      {/* Sidebar */}
      <Sidebar setCompactMenuOnHover={setCompactMenuOnHover} />

      {/* Top Bar */}
      <Topbar
        setActiveMobileMenu={setActiveMobileMenu}
        topBarActive={topBarActive}
      />
    </div>
  );
}

export default SidebarWrapper;
