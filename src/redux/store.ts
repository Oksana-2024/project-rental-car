import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import brandsReducer from "./brands/slice";
import carsReducer from "./cars/slice";
import likesReducer from "./likes/slice";

const persistConfig = {
  key: "likes",
  storage,
  whitelist: ["likes"],
};

const persistedReducer = persistReducer(persistConfig, likesReducer);

const store = configureStore({
  reducer: {
    brands: brandsReducer,
    cars: carsReducer,
    likes: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
