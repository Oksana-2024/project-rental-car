import type { StoreType } from "../store";

export const selectCars = (state: StoreType) => state.cars.items;
export const selectPage = (state: StoreType) => state.cars.page;
export const selectTotalPages = (state: StoreType) => state.cars.totalPages;
export const selectIsLoading = (state: StoreType) => state.cars.isLoading;
