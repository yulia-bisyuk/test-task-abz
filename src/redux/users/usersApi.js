import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://frontend-test-assignment-api.abz.agency/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Token', token.token);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],

  endpoints: builder => ({
    getUsers: builder.query({
      query: page => `users?page=${page}&count=6`,
      providesTags: ['User'],
    }),

    getPositions: builder.query({
      query: () => `positions`,
      providesTags: ['User'],
    }),

    getToken: builder.query({
      query: () => `token`,
      providesTags: ['User'],
    }),

    signUpUser: builder.mutation({
      query: user => ({
        url: `users`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetPositionsQuery,
  useSignUpUserMutation,
  useGetTokenQuery,
} = usersApi;
