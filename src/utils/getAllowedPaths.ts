import type { TBackendMenu } from "@/features/dashboard/_types/types";

export function getAllowedPaths(menus: TBackendMenu[]) {
  const paths = new Set<string>();

  const walk = (items: TBackendMenu[]) => {
    items?.forEach((item) => {
      if (item.url) paths.add(item.url);
      if (item.children?.length) walk(item.children);
    });
  };

  walk(menus);
  return paths;
}

export function isAllowedByException(pathname: string) {
  if (pathname === "/profile") return true;
  if (pathname === "/") return true;
  if (pathname.endsWith("/create")) return true;
  return false;
}
