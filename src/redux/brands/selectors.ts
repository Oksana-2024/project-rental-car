import type { StoreType } from "../store";

export const selectBrands = (state: StoreType) => state.brands.brand;
