import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    onboardingCompleted: false,
  },
  reducers: {
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
    },
  },
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export const { completeOnboarding } = appSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;