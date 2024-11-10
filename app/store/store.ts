import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

import { rootReducer } from "./rootReducer"
// import reactotron from "app/devtools/ReactotronConfig"
import listenerMiddleware from "./listenerMiddleware"
import { reduxStorage } from "@/utils/storage"
// import reactotron from "@/devtools/ReactotronConfig"

const persistConfig = {
  key: "root",
  version: 1,
  storage: reduxStorage,
  whitelist: ["auth"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddleware.middleware), // Ensure listenerMiddleware has a middleware property
  enhancers: (getDefaultEnhancers) => {
    const enhancers = getDefaultEnhancers();
    // if (__DEV__) {
    //   enhancers.push(reactotron.createEnhancer());
    // }
    return enhancers;
  },
});

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout app instead of plain `useDispatch` and `useSelector` for type safety
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
