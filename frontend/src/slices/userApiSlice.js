import { USERS_URL, CAPTCHA_URL } from '../constants';
import { apiSlice } from './apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/logout`,
            }),
          }),
          login: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/login`,
              method: 'POST',
              body: data,
            }),
          }),
          register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/register`,
              method: 'POST',
              body: data,
            }),
          }),
          forgotPasswd: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/forgotpassword`,
              method: 'POST',
              body: data,
            }),
          }),
          updatePasswd: builder.mutation({
            //ensure to destructure the data it will take in
            //id is the id of the person whose password is to be updated
            query: ({ id, ...data}) => ({
              url: `${USERS_URL}/updatepassword/${id}`,
              method: 'PUT',
              body: data,
            }),
          }),
          updateProfile: builder.mutation({
            //ensure to destructure the data it will take in
            //id is the id of the person whose password is to be updated
            query: ({ id, ...data}) => ({
              url: `${USERS_URL}/updateprofile/${id}`,
              method: 'PUT',
              body: data,
            }),
          }),
          getCaptchaEnv: builder.query({
            query: () => ({
              url: `${CAPTCHA_URL}/`,
            }),
          }),
          getUser: builder.query({
            query: () => ({
              url: `${USERS_URL}/profile`,
            }),
            providesTags:['User']
          }),
          getUsers: builder.query({
            query: () => ({
              url: `${USERS_URL}/users`,
            }),
            providesTags:['User']
          }),
          getUserById: builder.query({
            query: (id) => ({
              url: `${USERS_URL}/${id}`,
            }),
          }),
          deleteUser: builder.mutation({
            query: (id) => ({
              url: `${USERS_URL}/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags:['User']
          }),
    }),
});

export const { 
    useLogoutMutation, 
    useLoginMutation, 
    useRegisterMutation, 
    useForgotPasswdMutation, 
    useUpdatePasswdMutation,
    useGetCaptchaEnvQuery,
    useGetUserQuery,
    useUpdateProfileMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useDeleteUserMutation,
  } = userApiSlice;