import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  selectColorScheme,
  setColorScheme,
  colorSchemes,
  type ColorSchemes,
} from "../../stores/colorSchemeSlice";
import { setPageLoader } from "../../stores/pageLoaderSlice";
import { Slideover } from "../Headless";
import { useState } from "react";
import clsx from "clsx";
import Lucide from "../Lucide";

function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const activeColorScheme = useAppSelector(selectColorScheme);
  const [tempActiveColorScheme, setTempActiveColorScheme] =
    useState(activeColorScheme);
  const [themeSwitcherSlideover, setThemeSwitcherSlideover] = useState(false);

  const setColorSchemeClass = () => {
    const el = document.querySelectorAll("html")[0];
    el.setAttribute("class", activeColorScheme);
  };

  const switchColor = (colorScheme: ColorSchemes) => {
    dispatch(setPageLoader(true));
    setTempActiveColorScheme(colorScheme);
    setThemeSwitcherSlideover(false);

    setTimeout(() => {
      dispatch(setColorScheme(colorScheme));

      setTimeout(() => {
        dispatch(setPageLoader(false));
      }, 500);
    }, 500);
    localStorage.setItem("colorScheme", colorScheme);
    setColorSchemeClass();
  };

  setColorSchemeClass();

  return (
    <div>
      <Slideover
        open={themeSwitcherSlideover}
        onClose={() => {
          setThemeSwitcherSlideover(false);
        }}>
        <Slideover.Panel className="w-48 sm:w-56 lg:w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem] rtl:rounded-[0_0.75rem_0.75rem_0/0_1.1rem_1.1rem_0]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 start-0 end-auto flex items-center justify-center my-auto -ms-[60px] sm:-ms-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setThemeSwitcherSlideover(false);
            }}>
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="px-8 pt-6 pb-8">
              <div className="text-base font-medium">طرح‌های رنگی</div>
              <div className="text-slate-500 mt-0.5">
                طرح‌های رنگی خود را انتخاب کنید
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3.5 mt-5">
                {colorSchemes.map((colorScheme, colorKey) => (
                  <div key={colorKey}>
                    <div
                      onClick={() => switchColor(colorScheme)}
                      className={clsx([
                        "h-12 cursor-pointer bg-slate-50 box rounded-full p-1 border-slate-300/80",
                        tempActiveColorScheme == colorScheme &&
                          "border-2 border-theme-1/60",
                      ])}>
                      <div className="h-full overflow-hidden rounded-full">
                        <div className="flex items-center h-full gap-1 -mx-2">
                          <div
                            className={clsx([
                              "w-1/2 h-[140%] bg-theme-1 rotate-12",
                              colorScheme,
                            ])}></div>
                          <div
                            className={clsx([
                              "w-1/2 h-[140%] bg-theme-2 rotate-12",
                              colorScheme,
                            ])}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      <div
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          setThemeSwitcherSlideover(true);
        }}
        className="fixed bottom-0 end-0 z-50 flex items-center justify-center mb-5 me-5 text-white rounded-full shadow-lg cursor-pointer w-14 h-14 bg-theme-1">
        <Lucide className="w-5 h-5 animate-spin" icon="Settings" />
      </div>
    </div>
  );
}

export default ThemeSwitcher;
