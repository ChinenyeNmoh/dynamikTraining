import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.js';
import userSliceReducer from '../src/slices/authSlice.js';
import moduleSliceReducer from '../src/slices/moduleSlice.js';


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: userSliceReducer,
    module: moduleSliceReducer,

  },
  /*This configures the middleware for the Redux store. It starts with the default middleware provided 
  by Redux Toolkit (getDefaultMiddleware) and then adds (concat) the middleware required by the apiSlice. */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;