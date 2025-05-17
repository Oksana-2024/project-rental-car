import { createSlice } from "@reduxjs/toolkit";
import { getCars, loadMoreCars } from "./operations";

export interface ICar {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

interface ICarsType {
  items: ICar[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  totalPages: number;
  search: {
    brand: string;
    rentalPrice: string | number;
    minMileage: string | number;
    maxMileage: string | number;
  };
}

const cars: ICarsType = {
  items: [],
  isLoading: false,
  isError: false,
  page: 1,
  totalPages: 0,
  search: {
    brand: "",
    maxMileage: "",
    minMileage: "",
    rentalPrice: "",
  },
};

const carsSlice = createSlice({
  name: "cars",
  initialState: cars,
  reducers: {
    setSearch(state, { payload }) {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.items = action.payload.cars;
        state.isLoading = false;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(getCars.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(loadMoreCars.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loadMoreCars.fulfilled, (state, { payload }) => {
        state.items = [...state.items, ...payload.cars];
        state.isLoading = false;
        state.totalPages = payload.totalPages;
        state.page = payload.page;
      })
      .addCase(loadMoreCars.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

const carsReducer = carsSlice.reducer;

export default carsReducer;

export const { setSearch } = carsSlice.actions;
