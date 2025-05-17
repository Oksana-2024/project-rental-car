import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API } from "../../service/baseAPI";

export const getBrands = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("brands/all", async (_, thunkApi) => {
  try {
    const { data } = await BASE_API.get<string[]>("/brands");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Unknown error");
  }
});
