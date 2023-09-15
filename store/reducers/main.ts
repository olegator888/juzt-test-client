import { fetchNextPage } from "@/store/fetchNextPage";
import { Car } from "@/types/car";
import { ServerResponse } from "@/types/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StoreStatus = "idle" | "fetching" | "loading" | "error";

export interface StoreState {
  cars: Car[];
  page: number;
  hasMore: boolean;
  status: StoreStatus;
}

const initialState: StoreState = {
  cars: [],
  page: 1,
  hasMore: false,
  status: "idle",
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setCars: (state, { payload }: PayloadAction<Car[]>) => {
      state.cars = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setHasMore(state, { payload }: PayloadAction<boolean>) {
      state.hasMore = payload;
    },
    setStatus(state, { payload }: PayloadAction<StoreStatus>) {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextPage.pending, (state) => {
        state.status = "fetching";
      })
      .addCase(
        fetchNextPage.fulfilled,
        (state, { payload }: PayloadAction<ServerResponse | undefined>) => {
          state.status = "idle";
          if (payload) {
            state.cars = payload.cars;
            state.hasMore = payload.hasMore;
            state.page += 1;
          }
        }
      )
      .addCase(fetchNextPage.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setCars, setPage, setHasMore, setStatus } = storeSlice.actions;
export const mainReducer = storeSlice.reducer;
