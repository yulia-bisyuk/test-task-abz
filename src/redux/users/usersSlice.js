import { createSlice } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';

export const usersSlice = createSlice({
  name: 'auth',

  initialState: { token: '' },

  extraReducers: function (builder) {
    builder.addMatcher(
      usersApi.endpoints.getToken.matchFulfilled,
      (state, action) => {
        state.token = action.payload;
      }
    );
  },
});
