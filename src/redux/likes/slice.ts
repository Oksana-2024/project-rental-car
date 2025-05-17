import { createSlice } from "@reduxjs/toolkit";

interface ILikes {
  likes: string[];
}
const likes: ILikes = {
  likes: [],
};

const likeSlice = createSlice({
  name: "likes",
  initialState: likes,
  reducers: {
    toggleLike(state, action) {
      if (state.likes.includes(action.payload)) {
        state.likes = state.likes.filter((id) => action.payload !== id);
      } else {
        state.likes = [...state.likes, action.payload];
      }
    },
  },
});

const likesReducer = likeSlice.reducer;

export default likesReducer;
export const { toggleLike } = likeSlice.actions;
