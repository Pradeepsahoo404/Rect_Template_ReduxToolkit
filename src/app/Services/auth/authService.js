import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: (id) => ({
        url: `users/user-details/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDetailsQuery } = authApi;
