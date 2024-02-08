// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/firebaseAuthSlice";

export const store = configureStore({
  reducer: {
    // Active reducers list.
    firebaseAuth: authReducer,
  },
});

// Types solver.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
