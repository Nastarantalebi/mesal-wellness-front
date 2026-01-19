import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import compactMenuReducer from "./compactMenuSlice";
import pageLoaderReducer from "./pageLoaderSlice";
import colorSchemeReducer from "./colorSchemeSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    compactMenu: compactMenuReducer,
    pageLoader: pageLoaderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
