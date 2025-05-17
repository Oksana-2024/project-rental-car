import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API } from "../../service/baseAPI";
import type { StoreType } from "../store";
import { setSearch } from "./slice";

export const getCars = createAsyncThunk(
  "cars/all",
  async (init: boolean = false, thunkApi) => {
    try {
      if (init) {
        // clear our search state
        thunkApi.dispatch(setSearch({}));
      }
      const { search } = (thunkApi.getState() as StoreType).cars;
      const { data } = await BASE_API.get("/cars", {
        params: {
          ...search,
        },
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error");
    }
  }
);

export const loadMoreCars = createAsyncThunk(
  "cars/loadMore",
  async (_, thunkApi) => {
    try {
      const { search, page } = (thunkApi.getState() as StoreType).cars;
      const { data } = await BASE_API.get("/cars", {
        params: {
          ...search,
          page: Number(page) + 1,
        },
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error");
    }
  }
);
