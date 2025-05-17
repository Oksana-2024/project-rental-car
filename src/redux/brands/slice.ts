import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "./operations";

export interface IBrands {
  brand: string[];
  isLoading: boolean;
  isError: boolean;
}
const brands: IBrands = {
  brand: [],
  isLoading: false,
  isError: false,
};

const brandSlice = createSlice({
  name: "brands",
  initialState: brands,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getBrands.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(getBrands.fulfilled, (state, action) => {
      state.brand = action.payload;
      state.isLoading = false;
    })
    .addCase(getBrands.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

const brandsReducer = brandSlice.reducer;

export default brandsReducer;
