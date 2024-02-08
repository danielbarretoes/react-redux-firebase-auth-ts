import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfo } from "firebase/auth";

interface FirebaseAuthState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: FirebaseAuthState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const firebaseAuthSlice = createSlice({
  name: "firebaseAuth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.userInfo = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export reducer actions.
export const { setUserInfo, setLoading, setError } = firebaseAuthSlice.actions;

// Called from store.ts for easy component import.
export const selectUserInfo = (state: RootState) => state.firebaseAuth.userInfo;

// Export this reducer.
export default firebaseAuthSlice.reducer;
