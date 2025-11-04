import "../../../assets/css/vendors/simplebar.css";
import clsx from "clsx";
import SimpleBar from "simplebar-react";
import { linkTo, enter, leave } from "./side-menu";
import { useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type MouseEvent,
} from "react";
import Lucide from "../../../components/Lucide";
import { selectSideMenu } from "../../../stores/sideMenuSlice";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  selectCompactMenu,
  setCompactMenu as setCompactMenuStore,
} from "../../../stores/compactMenuSlice";
import { useLocation } from "react-router-dom";
import { type FormattedMenu, nestedMenu } from "./side-menu";

function Sidebar({
  setCompactMenuOnHover,
}: {
  setCompactMenuOnHover: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const scrollableRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const sideMenuStore = useAppSelector(selectSideMenu);
  const compactMenu = useAppSelector(selectCompactMenu);

  const setCompactMenu = useCallback(
    (val: boolean) => {
      localStorage.setItem("compactMenu", val.toString());
      dispatch(setCompactMenuStore(val));
    },
    [dispatch]
  );

  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | string>
  >([]);

  const location = useLocation();

  const compactLayout = useCallback(() => {
    if (window.innerWidth <= 1600) setCompactMenu(true);
  }, [setCompactMenu]);

  const sideMenu = useCallback(
    () => nestedMenu(sideMenuStore, location),
    [sideMenuStore, location]
  );

  useEffect(() => {
    setFormattedMenu(sideMenu());
    compactLayout();
    window.addEventListener("resize", compactLayout);
    return () => window.removeEventListener("resize", compactLayout);
  }, [sideMenu, compactLayout]);

  const toggleCompactMenu = (e: MouseEvent) => {
    e.preventDefault();
    setCompactMenu(!compactMenu);
  };

  return (
    <div
      className={clsx([
        "h-full box bg-white/[0.95] rounded-none xl:rounded-xl z-20 relative w-[275px] duration-300 transition-[width] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] overflow-hidden flex flex-col",
      ])}
      onMouseOver={() => setCompactMenuOnHover(true)}
      onMouseLeave={() => setCompactMenuOnHover(false)}
    >
      {/* Logo */}
      <div
        className={clsx([
          "flex-none hidden xl:flex items-center z-10 px-5 h-[65px] w-[275px] overflow-hidden relative duration-300 group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px]",
        ])}
      >
        <a
          href=""
          className="flex items-center transition-[margin] duration-300 group-[.side-menu--collapsed]:xl:ms-2 group-[.side-menu--collapsed.side-menu--on-hover]:xl:ms-0"
        >
          <div className="flex items-center justify-center w-[34px] rounded-lg h-[34px] bg-gradient-to-b from-theme-1 to-theme-2/80 transition-transform ease-in-out group-[.side-menu--collapsed.side-menu--on-hover]:xl:-rotate-180">
            <div className="w-[16px] h-[16px] relative -rotate-45 [&_div]:bg-white">
              <div className="absolute w-[21%] start-0 inset-y-0 my-auto rounded-full opacity-50 h-[75%]"></div>
              <div className="absolute w-[21%] inset-0 m-auto h-[120%] rounded-full"></div>
              <div className="absolute w-[21%] end-0 inset-y-0 my-auto rounded-full opacity-50 h-[75%]"></div>
            </div>
          </div>
          <div className="ms-3.5 group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:opacity-0 transition-opacity font-medium">
            سالن زیبایی
          </div>
        </a>
        <a
          href=""
          onClick={toggleCompactMenu}
          className="hidden group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:rotate-180 group-[.side-menu--collapsed]:xl:opacity-0 transition-[opacity,transform] 3xl:flex items-center justify-center w-[20px] h-[20px] ms-auto border rounded-full border-slate-600/40 hover:bg-slate-600/5"
        >
          <Lucide icon="ArrowLeft" className="w-3.5 h-3.5 stroke-[1.3]" />
        </a>
      </div>

      {/* Scrollable Menu */}
      <SimpleBar
        scrollableNodeProps={{ ref: scrollableRef }}
        className={clsx([
          "w-full h-full z-20 px-5 overflow-y-auto overflow-x-hidden pb-3 [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)] [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent",
          "[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical]:me-0.5 [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30",
        ])}
      >
        <ul className="scrollable">
          {/* BEGIN: First Child */}
          {formattedMenu.map((menu, menuKey) =>
            typeof menu == "string" ? (
              <li className="side-menu__divider" key={menuKey}>
                {menu}
              </li>
            ) : (
              <li key={menuKey}>
                <a
                  href=""
                  className={clsx([
                    "side-menu__link",
                    { "side-menu__link--active": menu.active },
                    {
                      "side-menu__link--active-dropdown": menu.activeDropdown,
                    },
                  ])}
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    linkTo(menu, navigate);
                    setFormattedMenu([...formattedMenu]);
                  }}
                >
                  <Lucide icon={menu.icon} className="side-menu__link__icon" />
                  <div className="side-menu__link__title">{menu.title}</div>
                  {menu.badge && (
                    <div className="side-menu__link__badge">{menu.badge}</div>
                  )}
                  {menu.subMenu && (
                    <Lucide
                      icon="ChevronDown"
                      className="side-menu__link__chevron"
                    />
                  )}
                </a>
                {/* BEGIN: Second Child */}
                {menu.subMenu && (
                  <Transition
                    in={menu.activeDropdown}
                    onEnter={enter}
                    onExit={leave}
                    timeout={300}
                  >
                    <ul
                      className={clsx([
                        "",
                        { block: menu.activeDropdown },
                        { hidden: !menu.activeDropdown },
                      ])}
                    >
                      {menu.subMenu.map((subMenu, subMenuKey) => (
                        <li key={subMenuKey}>
                          <a
                            href=""
                            className={clsx([
                              "side-menu__link",
                              { "side-menu__link--active": subMenu.active },
                              {
                                "side-menu__link--active-dropdown":
                                  subMenu.activeDropdown,
                              },
                            ])}
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              linkTo(subMenu, navigate);
                              setFormattedMenu([...formattedMenu]);
                            }}
                          >
                            <Lucide
                              icon={subMenu.icon}
                              className="side-menu__link__icon"
                            />
                            <div className="side-menu__link__title">
                              {subMenu.title}
                            </div>
                            {subMenu.badge && (
                              <div className="side-menu__link__badge">
                                {subMenu.badge}
                              </div>
                            )}
                            {subMenu.subMenu && (
                              <Lucide
                                icon="ChevronDown"
                                className="side-menu__link__chevron"
                              />
                            )}
                          </a>
                          {/* BEGIN: Third Child */}
                          {subMenu.subMenu && (
                            <Transition
                              in={subMenu.activeDropdown}
                              onEnter={enter}
                              onExit={leave}
                              timeout={300}
                            >
                              <ul
                                className={clsx([
                                  "",
                                  {
                                    block: subMenu.activeDropdown,
                                  },
                                  { hidden: !subMenu.activeDropdown },
                                ])}
                              >
                                {subMenu.subMenu.map(
                                  (lastSubMenu, lastSubMenuKey) => (
                                    <li key={lastSubMenuKey}>
                                      <a
                                        href=""
                                        className={clsx([
                                          "side-menu__link",
                                          {
                                            "side-menu__link--active":
                                              lastSubMenu.active,
                                          },
                                          {
                                            "side-menu__link--active-dropdown":
                                              lastSubMenu.activeDropdown,
                                          },
                                        ])}
                                        onClick={(event: React.MouseEvent) => {
                                          event.preventDefault();
                                          linkTo(lastSubMenu, navigate);
                                          setFormattedMenu([...formattedMenu]);
                                        }}
                                      >
                                        <Lucide
                                          icon={lastSubMenu.icon}
                                          className="side-menu__link__icon"
                                        />
                                        <div className="side-menu__link__title">
                                          {lastSubMenu.title}
                                        </div>
                                        {lastSubMenu.badge && (
                                          <div className="side-menu__link__badge">
                                            {lastSubMenu.badge}
                                          </div>
                                        )}
                                      </a>
                                    </li>
                                  )
                                )}
                              </ul>
                            </Transition>
                          )}
                          {/* END: Third Child */}
                        </li>
                      ))}
                    </ul>
                  </Transition>
                )}
                {/* END: Second Child */}
              </li>
            )
          )}
          {/* END: First Child */}
        </ul>
      </SimpleBar>
    </div>
  );
}

export default Sidebar;
