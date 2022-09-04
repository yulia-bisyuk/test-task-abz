import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './users/usersApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(usersApi.middleware);
  },
});
