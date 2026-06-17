import "../../../assets/css/vendors/simplebar.css";
import clsx from "clsx";
import { linkTo, enter, leave, type FormattedMenu } from "./side-menu";
import { useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";
import { useEffect, useRef } from "react";
import React from "react";
import Lucide from "@/components/Lucide";
import useOrganization from "@/features/auth/_services/useOrganization";

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
      className="absolute inset-y-0 xl:top-[65px] z-10 xl:z-0 select-none "
      onMouseOver={() => setCompactMenuOnHover(true)}
      onMouseLeave={() => setCompactMenuOnHover(false)}
    >
      <div
        className={clsx([
          "xl:ms-0 bg-slate-100 border-e border-slate-300/50 rounded-none w-[275px] duration-300 transition-[width,margin] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:border-solid relative overflow-hidden h-full flex flex-col",
          "after:content-[''] after:fixed after:inset-0 after:bg-black/80 after:z-[-1] after:xl:hidden",
          { "ms-0 after:block": activeMobileMenu },
          { "-ms-[275px] after:hidden": !activeMobileMenu },
        ])}
      >
        {/* Mobile close button */}
        <div
          className={clsx([
            { flex: activeMobileMenu },
            { hidden: !activeMobileMenu },
          ])}
        >
          <span role="button" onClick={() => setActiveMobileMenu(false)}>
            <Lucide icon="CircleX" className="w-8 h-8 text-white mt-5 ms-5" />
          </span>
        </div>

        <div
          ref={scrollableRef}
          className={clsx([
            "w-full h-full z-20 px-2 xl:px-5 overflow-y-auto overflow-x-hidden py-3 xl:pt-0 ",
            "[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent",
          ])}
        >
          <ul className="scrollable">
            {/* BEGIN: First Level */}
            {formattedMenu.map((menu, menuKey) =>
              typeof menu === "string" ? (
                // Divider
                <li className="side-menu__divider" key={menuKey}>
                  {menu}
                </li>
              ) : (
                <li key={menuKey}>
                  {/* First-level link */}
                  <a
                    href={menu.url ?? "#"}
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
                    <Lucide
                      icon={menu.icon}
                      className="side-menu__link__icon"
                    />
                    <div className="side-menu__link__title !cursor-pointer">
                      {menu.label}
                    </div>
                    {/* ✅ Only show chevron if this item has children */}
                    {menu.children && (
                      <Lucide
                        icon={menu.activeDropdown ? "ChevronUp" : "ChevronDown"}
                        className="side-menu__link__chevron"
                      />
                    )}
                  </a>

                  {/* BEGIN: Second Level */}
                  {menu.children && (
                    <Transition
                      nodeRef={getSubMenuRef(`sub-menu-1-${menuKey}`)}
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        ref={getSubMenuRef(`sub-menu-1-${menuKey}`)}
                        className={clsx([
                          { block: menu.activeDropdown },
                          { hidden: !menu.activeDropdown },
                        ])}
                      >
                        {menu.children.map((item, subMenuKey) => (
                          <li key={subMenuKey}>
                            <a
                              href={item.url ?? "#"}
                              className={clsx([
                                "side-menu__link !pr-4",
                                // { "side-menu__link--active": item.active },
                                // {
                                //   "side-menu__link--active-dropdown":
                                //     item.activeDropdown,
                                // },
                              ])}
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                linkTo(item, navigate);
                                setFormattedMenu([...formattedMenu]);
                              }}
                            >
                              <Lucide
                                icon={item.icon}
                                className="side-menu__link__icon"
                              />
                              <div className="side-menu__link__title">
                                {item.label}
                              </div>
                              {/* ✅ Bug 1 fixed: check item.children, not menu.children */}
                              {item.children && (
                                <Lucide
                                  icon={
                                    item.activeDropdown
                                      ? "ChevronUp"
                                      : "ChevronDown"
                                  }
                                  className="side-menu__link__chevron"
                                />
                              )}
                            </a>

                            {/* BEGIN: Third Level */}
                            {item.children && (
                              <Transition
                                nodeRef={getSubMenuRef(
                                  `sub-menu-2-${menuKey}-${subMenuKey}`,
                                )}
                                // ✅ Bug 2 fixed: use item.activeDropdown, not menu.activeDropdown
                                in={item.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  ref={getSubMenuRef(
                                    `sub-menu-2-${menuKey}-${subMenuKey}`,
                                  )}
                                  className={clsx([
                                    // ✅ Bug 3 fixed: use item.activeDropdown, not menu.activeDropdown
                                    { block: item.activeDropdown },
                                    { hidden: !item.activeDropdown },
                                  ])}
                                >
                                  {item.children.map(
                                    (lastSubMenu, lastSubMenuKey) => (
                                      <li key={lastSubMenuKey}>
                                        <a
                                          href={lastSubMenu.url ?? "#"}
                                          className={clsx([
                                            "side-menu__link",
                                            {
                                              "side-menu__link--active":
                                                lastSubMenu.active,
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
                                          }}
                                        >
                                          <Lucide
                                            icon={lastSubMenu.icon}
                                            className="side-menu__link__icon"
                                          />
                                          <div className="side-menu__link__title">
                                            {lastSubMenu.label}
                                          </div>
                                        </a>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </Transition>
                            )}
                            {/* END: Third Level */}
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                  {/* END: Second Level */}
                </li>
              ),
            )}
            {/* END: First Level */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
