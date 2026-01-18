import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";
import type { Menu } from "./sideMenuSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const flattenMenu = (menu: Array<Menu | string>) => {
  const map: Record<string, { title: string }> = {};

  const walk = (items: Array<Menu | string>) => {
    items.forEach((item) => {
      if (typeof item === "string") return;

      if (item.pathname) {
        map[item.pathname] = {
          title: item.title,
        };
      }

      if (item.subMenu) walk(item.subMenu);
    });
  };

  walk(menu);

  return map;
};
