import "../../../assets/css/vendors/simplebar.css";
import clsx from "clsx";
import { linkTo, enter, leave, type FormattedMenu } from "./side-menu";
import { useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";
import { useEffect, useRef } from "react";
import React from "react";
import Lucide from "@/components/Lucide";

function Sidebar({
  setCompactMenuOnHover,
  activeMobileMenu,
  setActiveMobileMenu,
  formattedMenu,
  setFormattedMenu,
}: {
  setCompactMenuOnHover: React.Dispatch<React.SetStateAction<boolean>>;
  activeMobileMenu: boolean;
  setActiveMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  formattedMenu: (string | FormattedMenu)[];
  setFormattedMenu: React.Dispatch<
    React.SetStateAction<(string | FormattedMenu)[]>
  >;
}) {
  const navigate = useNavigate();
  const scrollableRef = useRef<HTMLDivElement>(null);

  const subMenuRefs = useRef<{
    [key: string]: React.RefObject<HTMLUListElement | null>;
  }>({});

  const getSubMenuRef = (
    key: string,
  ): React.RefObject<HTMLUListElement | null> => {
    if (!subMenuRefs.current[key]) {
      subMenuRefs.current[key] = React.createRef<HTMLUListElement>();
    }
    return subMenuRefs.current[key]!;
  };
  useEffect(() => {
    activeMobileMenu
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [activeMobileMenu]);
  return (
    <div
      className="absolute inset-y-0 xl:top-[65px] z-10 xl:z-0 select-none"
      onMouseOver={() => setCompactMenuOnHover(true)}
      onMouseLeave={() => setCompactMenuOnHover(false)}>
      <div
        className={clsx([
          "xl:ms-0 bg-slate-100 border-e border-slate-300/50 rounded-none w-[275px] duration-300 transition-[width,margin] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:border-solid relative overflow-hidden h-full flex flex-col",
          "after:content-[''] after:fixed after:inset-0 after:bg-black/80 after:z-[-1] after:xl:hidden",
          { "ms-0 after:block": activeMobileMenu },
          { "-ms-[275px] after:hidden": !activeMobileMenu },
        ])}>
        <div
          className={clsx([
            "fixed ms-[275px] w-10 h-10 items-center justify-center xl:hidden",
            { flex: activeMobileMenu },
            { hidden: !activeMobileMenu },
          ])}>
          <span role="button" onClick={() => setActiveMobileMenu(false)}>
            <Lucide icon="CircleX" className="w-8 h-8 text-white mt-5 ms-5" />
          </span>
        </div>
        <div
          ref={scrollableRef}
          className={clsx([
            "w-full h-full z-20 px-2 xlpx-5 overflow-y-auto overflow-x-hidden py-3 xl:pt-0 [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent",
            "[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical]:me-0.5 [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30",
          ])}>
          <ul className="scrollable ">
            {/* BEGIN: First Child */}
            {formattedMenu.map((menu, menuKey) =>
              typeof menu == "string" ? (
                <li className="side-menu__divider" key={menuKey}>
                  {menu}
                </li>
              ) : (
                <li key={menuKey}>
                  <a
                    href={menu.pathname!}
                    className={clsx([
                      "side-menu__link ",
                      { "side-menu__link--active": menu.active },
                      {
                        "side-menu__link--active-dropdown": menu.activeDropdown,
                      },
                    ])}
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault();
                      linkTo(menu, navigate);
                      setFormattedMenu([...formattedMenu]);
                    }}>
                    <Lucide
                      icon={menu.icon}
                      className="side-menu__link__icon"
                    />
                    <div className="side-menu__link__title !cursor-pointer">
                      {menu.label}
                    </div>
                    {menu.badge && (
                      <div className="side-menu__link__badge">{menu.badge}</div>
                    )}
                    {menu.subMenu && (
                      <Lucide
                        icon={menu.activeDropdown ? "ChevronUp" : "ChevronDown"}
                        className="side-menu__link__chevron"
                      />
                    )}
                  </a>
                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <Transition
                      nodeRef={getSubMenuRef(`sub-menu-1-${menuKey}`)}
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}>
                      <ul
                        ref={getSubMenuRef(`sub-menu-1-${menuKey}`)}
                        className={clsx([
                          "",
                          { block: menu.activeDropdown },
                          { hidden: !menu.activeDropdown },
                        ])}>
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey} className="">
                            <a
                              href={subMenu.pathname}
                              className={clsx([
                                "side-menu__link !pr-4",
                                {
                                  "side-menu__link--active": subMenu.active,
                                },
                                {
                                  "side-menu__link--active-dropdown":
                                    subMenu.activeDropdown,
                                },
                              ])}
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                linkTo(subMenu, navigate);
                                setFormattedMenu([...formattedMenu]);
                              }}>
                              <Lucide
                                icon={subMenu.icon}
                                className="side-menu__link__icon"
                              />
                              <div className="side-menu__link__title">
                                {subMenu.label}
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
                                nodeRef={getSubMenuRef(
                                  `sub-menu-2-${menuKey}-${subMenuKey}`,
                                )}
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}>
                                <ul
                                  ref={getSubMenuRef(
                                    `sub-menu-2-${menuKey}-${subMenuKey}`,
                                  )}
                                  className={clsx([
                                    "",
                                    {
                                      block: subMenu.activeDropdown,
                                    },
                                    { hidden: !subMenu.activeDropdown },
                                  ])}>
                                  {subMenu.subMenu.map(
                                    (lastSubMenu, lastSubMenuKey) => (
                                      <li key={lastSubMenuKey}>
                                        <a
                                          href={lastSubMenu.pathname}
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
                                          onClick={(
                                            event: React.MouseEvent,
                                          ) => {
                                            event.preventDefault();
                                            linkTo(lastSubMenu, navigate);
                                            setFormattedMenu([
                                              ...formattedMenu,
                                            ]);
                                          }}>
                                          <Lucide
                                            icon={lastSubMenu.icon}
                                            className="side-menu__link__icon"
                                          />
                                          <div className="side-menu__link__title">
                                            {lastSubMenu.label}
                                          </div>
                                          {lastSubMenu.badge && (
                                            <div className="side-menu__link__badge">
                                              {lastSubMenu.badge}
                                            </div>
                                          )}
                                        </a>
                                      </li>
                                    ),
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
              ),
            )}
            {/* END: First Child */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
