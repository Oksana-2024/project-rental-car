import { configureStore } from "@reduxjs/toolkit";
import brandsReducer from "./brands/slice";
import carsReducer from "./cars/slice";
import likesReducer from "./likes/slice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "likes", // Ключ для сховища
  storage, // Тип сховища
  whitelist: ["likes"], // Масив частин стану для збереження
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
        // Ігноруємо типи дій redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
