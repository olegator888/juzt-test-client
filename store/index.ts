import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mainReducer } from "@/store/reducers/main";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
