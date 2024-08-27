import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Create a base query function using fetchBaseQuery and set the base URL to BASE_URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Define and export an API slice using createApi
export const apiSlice = createApi({
  baseQuery,
  
  // Define tag types used for cache invalidation and data refetching
  tagTypes: [ 'User', 'Module'],


  // Define the endpoints for this API slice using a builder function
  endpoints: (builder) => ({}),
});
