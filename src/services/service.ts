// services/service.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CommonService = createApi({
  reducerPath: 'CommonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev-gst.infinitisoftware.net/gstapi/gst/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const user = localStorage.getItem('user');

      if (user) {
        const token = JSON.parse(user)?.token;
        if (token) {
          headers.set('X-XSRF-TOKEN', token);
        }
      }

      return headers;
    }
  }),
  endpoints: () => ({}), // base only, extended via injectEndpoints
});
