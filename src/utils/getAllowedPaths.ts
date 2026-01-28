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
function removeTrailingSlash(path: string): string {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function isAllowedByException(pathname: string) {
  const cleanPath = removeTrailingSlash(pathname);
  if (cleanPath === "/profile") return true;
  if (cleanPath === "/") return true;
  if (cleanPath === "/tickets") return true;
  if (/^\/tickets\/\d+$/.test(cleanPath)) return true;
  if (/^\/tickets\/[a-zA-Z0-9-]+$/.test(cleanPath)) return true;
  if (cleanPath.endsWith("/create")) return true;
  return false;
}
