import clsx from "clsx";
import { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { Menu } from "../../../components/Headless";
import QuickSearch from "../../../components/QuickSearch";
import ActivitiesPanel from "../../../components/ActivitiesPanel";
import NotificationsPanel from "../../../components/NotificationsPanel";
import SwitchAccount from "../../../components/SwitchAccount";
import Lucide from "../../../components/Lucide";
import { useNavigate } from "react-router-dom";

function Topbar({
  setActiveMobileMenu,
  topBarActive,
}: {
  setActiveMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  topBarActive: boolean;
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
    <div className="fixed h-[65px] transition-[margin] duration-100 xl:ms-[275px] group-[.side-menu--collapsed]:xl:ms-[90px] mt-3.5 inset-x-0 top-0">
      <div
        className={clsx([
          "top-bar absolute start-0 xl:start-3.5 end-0 h-full mx-5 group",
          "before:content-[''] before:absolute before:top-0 before:inset-x-0 before:-mt-[15px] before:h-[20px] before:backdrop-blur",
          topBarActive && "top-bar--active",
        ])}
      >
        <div
          className="
                container flex items-center w-full h-full transition-[padding,background-color,border-color] ease-in-out duration-300 box bg-transparent border-transparent shadow-none
                group-[.top-bar--active]:box group-[.top-bar--active]:px-5
                group-[.top-bar--active]:bg-transparent group-[.top-bar--active]:border-transparent group-[.top-bar--active]:bg-gradient-to-r group-[.top-bar--active]:from-theme-1 group-[.top-bar--active]:to-theme-2
              "
        >
          <div className="flex items-center gap-1 xl:hidden">
            <a
              href=""
              onClick={(event) => {
                event.preventDefault();
                setActiveMobileMenu(true);
              }}
              className="p-2 text-white rounded-full hover:bg-white/5"
            >
              <Lucide
                icon="AlignVerticalJustifyCenter"
                className="w-[18px] h-[18px]"
              />
            </a>
            <a
              href=""
              className="p-2 text-white rounded-full hover:bg-white/5"
              onClick={(e) => {
                e.preventDefault();
                setQuickSearch(true);
              }}
            >
              <Lucide icon="Search" className="w-[18px] h-[18px]" />
            </a>
          </div>
          {/* BEGIN: Breadcrumb */}
          <Breadcrumb light className="flex-1 hidden xl:block">
            <Breadcrumb.Link to="/">اپلیکیشن</Breadcrumb.Link>
            <Breadcrumb.Link to="/">داشبوردها</Breadcrumb.Link>
            <Breadcrumb.Link to="/" active={true}>
              تحلیلی
            </Breadcrumb.Link>
          </Breadcrumb>
          {/* END: Breadcrumb */}
          {/* BEGIN: Search */}
          <div
            className="relative justify-center flex-1 hidden xl:flex"
            onClick={() => setQuickSearch(true)}
          >
            <div className="bg-white/[0.12] border-transparent border w-[350px] flex items-center py-2 px-3.5 rounded-[0.5rem] text-white/60 cursor-pointer hover:bg-white/[0.15] transition-colors duration-300 hover:duration-100">
              <Lucide icon="Search" className="w-[18px] h-[18px]" />
              <div className="ms-2.5 me-auto">جستجوی سریع...</div>
              <div>⌘K</div>
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
                className="p-2 text-white rounded-full hover:bg-white/5"
                onClick={(e) => {
                  e.preventDefault();
                  setActivitiesPanel(true);
                }}
              >
                <Lucide icon="LayoutGrid" className="w-[18px] h-[18px]" />
              </a>
              {/* <a
                    href=""
                    className="p-2 text-white rounded-full hover:bg-white/5"
                  >
                    <Lucide icon="Moon" className="w-[18px] h-[18px]" />
                  </a> */}
              <a
                href=""
                className="p-2 text-white rounded-full hover:bg-white/5"
                onClick={(e) => {
                  e.preventDefault();
                  requestFullscreen();
                }}
              >
                <Lucide icon="Expand" className="w-[18px] h-[18px]" />
              </a>
              <a
                href=""
                className="p-2 text-white rounded-full hover:bg-white/5"
                onClick={(e) => {
                  e.preventDefault();
                  setNotificationsPanel(true);
                }}
              >
                <Lucide icon="Bell" className="w-[18px] h-[18px]" />
              </a>
            </div>
            <Menu className="ms-5">
              <Menu.Button className="overflow-hidden rounded-full w-[36px] h-[36px] border-[3px] border-white/[0.15] image-fit">
                {/* <img
                  alt="تیل وایز - قالب داشبورد مدیریتی"
                  src={users.fakeUsers()[0].photo}
                /> */}
              </Menu.Button>
              <Menu.Items className="w-56 mt-1">
                <Menu.Item
                  onClick={() => {
                    setSwitchAccount(true);
                  }}
                >
                  <Lucide icon="ToggleLeft" className="w-4 h-4 me-2" />
                  تغییر حساب
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={() => {
                    navigate("settings?page=connected-services");
                  }}
                >
                  <Lucide icon="Settings" className="w-4 h-4 me-2" />
                  خدمات متصل
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    navigate("settings?page=email-settings");
                  }}
                >
                  <Lucide icon="Inbox" className="w-4 h-4 me-2" />
                  تنظیمات ایمیل
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    navigate("settings?page=security");
                  }}
                >
                  <Lucide icon="Lock" className="w-4 h-4 me-2" />
                  بازنشانی رمز عبور
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={() => {
                    navigate("settings");
                  }}
                >
                  <Lucide icon="Users" className="w-4 h-4 me-2" />
                  اطلاعات پروفایل
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    navigate("login");
                  }}
                >
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
