import fetchCars from "@/lib/fetching/fetchCars";
import { RootState } from "@/store";
import { ServerResponse } from "@/types/data";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParsedQuery } from "query-string";

export const fetchNextPage = createAsyncThunk<
  ServerResponse | undefined,
  ParsedQuery<string>,
  { state: RootState }
>("fetchNextPage", async (query, thunkApi) => {
  const { getState } = thunkApi;
  const hasMore = getState().main.hasMore;
  const page = getState().main.page;

  if (hasMore) {
    const data = await fetchCars({ page: page + 1, query });
    return data;
  }
});
