import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://frontend-test-assignment-api.abz.agency/api/v1/',
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
    signUpUser: builder.query({
      query: (user, token) => ({
        url: `users`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: user,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetPositionsQuery } = usersApi;
