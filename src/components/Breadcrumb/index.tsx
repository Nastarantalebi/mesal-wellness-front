import clsx from "clsx";
import { Link } from "react-router-dom";
import { createContext, useContext, cloneElement, isValidElement } from "react";

interface BreadcrumbProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"nav"> {
  light?: boolean;
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
}

const breadcrumbContext = createContext<{ light?: boolean }>({
  light: undefined,
});

function Breadcrumb({ className, light, children }: BreadcrumbProps) {
  return (
    <breadcrumbContext.Provider value={{ light }}>
      <nav className={clsx("flex", className)} aria-label="breadcrumb">
        <ol
          className={clsx(
            "flex items-center text-theme-1 dark:text-slate-300",
            {
              "text-white/90": light,
            }
          )}>
          {Array.isArray(children)
            ? children.map((item, key) =>
                isValidElement(item) ? cloneElement(item, { key }) : item
              )
            : children}
        </ol>
      </nav>
    </breadcrumbContext.Provider>
  );
}

interface BreadcrumbLinkProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"li"> {
  to?: string;
  active?: boolean;
  index?: number; // instead of using `key` as a prop
}

function BreadcrumbLink({
  className,
  to = "",
  active = false,
  index = 0,
  children,
  ...attr
}: BreadcrumbLinkProps) {
  const breadcrumb = useContext(breadcrumbContext);

  return (
    <li
      className={clsx(
        className,
        index > 0 && "relative ms-5 ps-0.5",
        !breadcrumb.light &&
          index > 0 &&
          "before:content-[''] before:w-[14px] before:h-[14px] before:bg-chevron-black before:transform before:rotate-[-90deg] rtl:before:rotate-[90deg] before:bg-[length:100%] before:-ms-[1.125rem] before:absolute before:my-auto before:inset-y-0",
        breadcrumb.light &&
          index > 0 &&
          "before:content-[''] before:w-[14px] before:h-[14px] before:bg-chevron-white before:transform before:rotate-[-90deg] rtl:before:rotate-[90deg] before:bg-[length:100%] before:-ms-[1.125rem] before:absolute before:my-auto before:inset-y-0",
        index > 0 && "dark:before:bg-chevron-black",
        !breadcrumb.light &&
          active &&
          "text-slate-600 cursor-text dark:text-slate-400",
        breadcrumb.light && active && "text-white/70"
      )}
      {...attr}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

// Attach Link subcomponent
Breadcrumb.Link = BreadcrumbLink;

export default Breadcrumb;
