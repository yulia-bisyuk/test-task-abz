import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './users/usersApi';
import { usersSlice } from './users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: usersSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(usersApi.middleware);
  },
});
