import clsx from "clsx";
import { useState } from "react";
import { Menu } from "../../../components/Headless";
import QuickSearch from "../../../components/QuickSearch";
import ActivitiesPanel from "../../../components/ActivitiesPanel";
import NotificationsPanel from "../../../components/NotificationsPanel";
import SwitchAccount from "../../../components/SwitchAccount";
import Lucide from "../../../components/Lucide";
import { useNavigate } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import DynamicBreadcrumb from "./DynamicBreadcrumb";

function Topbar({
  setActiveMobileMenu,
  setCompactMenuOnHover,
  toggleCompactMenu,
}: {
  setActiveMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setCompactMenuOnHover: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCompactMenu: () => void;
}) {
  const navigate = useNavigate();

  const [quickSearch, setQuickSearch] = useState(false);
  const [switchAccount, setSwitchAccount] = useState(false);
  const [notificationsPanel, setNotificationsPanel] = useState(false);
  const [activitiesPanel, setActivitiesPanel] = useState(false);

  const requestFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };
  return (
    <div className="fixed top-0 inset-x-0 z-10 h-[65px] box bg-slate-50 border-x-0 border-t-0 rounded-none flex shadow-none">
      <div
        className={clsx([
          "xl:bg-slate-100 flex-none flex items-center z-10 px-5 h-full xl:w-[275px] overflow-hidden relative duration-300 group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000001f]",
          "before:content-[''] before:hidden before:xl:block before:absolute before:end-0 before:border-e before:border-slate-300/50 before:h-full",
        ])}
        onMouseOver={(event) => {
          event.preventDefault();
          setCompactMenuOnHover(true);
        }}
        onMouseLeave={(event) => {
          event.preventDefault();
          setCompactMenuOnHover(false);
        }}>
        <a
          href=""
          className="hidden xl:flex items-center transition-[margin] group-[.side-menu--collapsed]:xl:ms-2 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ms-0">
          <div className="flex items-center justify-center w-[34px] rounded-lg h-[34px]">
            <img src="/logo-192×192.png" alt="لوگو" />
          </div>
        </a>
        <button
          onClick={toggleCompactMenu}
          className="group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:rotate-180 group-[.side-menu--collapsed]:xl:opacity-0 transition-[opacity,transform] hidden 3xl:flex items-center justify-center w-[20px] h-[20px] ms-auto border rounded-full border-slate-600/40 hover:bg-slate-600/5">
          <Lucide icon="ArrowLeft" className="w-3.5 h-3.5 stroke-[1.3]" />
        </button>
        <div className="flex items-center gap-1 xl:hidden">
          <a
            href=""
            onClick={(event) => {
              event.preventDefault();
              setActiveMobileMenu(true);
            }}
            className="p-2 rounded-full hover:bg-slate-100">
            <AlignJustify className="w-[18px] h-[18px]" />
          </a>
          <a
            href=""
            className="p-2 rounded-full hover:bg-slate-100"
            onClick={(e) => {
              e.preventDefault();
              setQuickSearch(true);
            }}>
            <Lucide icon="Search" className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>
      <div className="absolute transition-[padding] duration-100 xl:ps-[275px] group-[.side-menu--collapsed]:xl:ps-[91px] h-full inset-x-0">
        <div className="flex items-center w-full h-full px-5">
          {/* BEGIN: Breadcrumb */}
          <div className="hidden xl:block">
            <DynamicBreadcrumb />
          </div>

          {/* END: Breadcrumb */}
          {/* BEGIN: Search */}
          <div
            className="relative justify-center flex-1 hidden xl:flex"
            onClick={() => setQuickSearch(true)}>
            <div className="bg-slate-100 border w-[350px] flex items-center py-2 px-3.5 rounded-[0.5rem] text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
              <Lucide icon="Search" className="w-[18px] h-[18px]" />
              <div className="ms-2.5 me-auto">جستجوی سریع...</div>
            </div>
          </div>
          <QuickSearch
            quickSearch={quickSearch}
            setQuickSearch={setQuickSearch}
          />
          {/* END: Search */}
          {/* BEGIN: Notification & User Menu */}
          <div className="flex items-center flex-1">
            <div className="flex items-center gap-1 ms-auto">
              <a
                href=""
                className="p-2 rounded-full hover:bg-slate-100"
                onClick={(e) => {
                  e.preventDefault();
                  setActivitiesPanel(true);
                }}>
                <Lucide icon="LayoutGrid" className="w-[18px] h-[18px]" />
              </a>
              {/* <a href="" className="p-2 rounded-full hover:bg-slate-100">
                    <Lucide icon="Goal" className="w-[18px] h-[18px]" />
                  </a> */}
              <a
                href=""
                className="p-2 rounded-full hover:bg-slate-100 hidden lg:inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  requestFullscreen();
                }}>
                <Lucide icon="Expand" className="w-[18px] h-[18px]" />
              </a>
              <a
                href=""
                className="p-2 rounded-full hover:bg-slate-100"
                onClick={(e) => {
                  e.preventDefault();
                  setNotificationsPanel(true);
                }}>
                <Lucide icon="Bell" className="w-[18px] h-[18px]" />
              </a>
            </div>
            <Menu className="ms-5">
              <Menu.Button className="overflow-hidden rounded-full w-[36px] h-[36px] border-[3px] border-slate-200/70 image-fit">
                {/* <img
                  alt="تیل وایز - قالب داشبورد مدیریتی"
                  src={users.fakeUsers()[0].photo}
                /> */}
                <Lucide icon="User" className="w-5 h-5 mx-auto" />
              </Menu.Button>
              <Menu.Items className="w-56 mt-1">
                <Menu.Item
                  onClick={() => {
                    navigate("settings");
                  }}>
                  <Lucide icon="User" className="w-4 h-4 me-2" />
                  نام کاربر
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={() => {
                    navigate("settings?page=connected-services");
                  }}>
                  <Lucide icon="Settings" className="w-4 h-4 me-2" />
                  خدمات متصل
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    navigate("settings?page=email-settings");
                  }}>
                  <Lucide icon="Inbox" className="w-4 h-4 me-2" />
                  تنظیمات ایمیل
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    navigate("settings?page=security");
                  }}>
                  <Lucide icon="Lock" className="w-4 h-4 me-2" />
                  بازنشانی رمز عبور
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={() => {
                    setSwitchAccount(true);
                  }}>
                  <Lucide icon="ToggleLeft" className="w-4 h-4 me-2" />
                  تغییر حساب
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    navigate("login");
                  }}>
                  <Lucide icon="Power" className="w-4 h-4 me-2" />
                  خروج
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
          <ActivitiesPanel
            activitiesPanel={activitiesPanel}
            setActivitiesPanel={setActivitiesPanel}
          />
          <NotificationsPanel
            notificationsPanel={notificationsPanel}
            setNotificationsPanel={setNotificationsPanel}
          />
          <SwitchAccount
            switchAccount={switchAccount}
            setSwitchAccount={setSwitchAccount}
          />
          {/* END: Notification & User Menu */}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
