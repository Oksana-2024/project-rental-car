import type { StoreType } from "../store";

export const selectLikes = (state: StoreType) => state.likes.likes;
