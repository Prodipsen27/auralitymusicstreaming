import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { apiCoreApi } from './services/apiCore.js';

export const store = configureStore({
  reducer: {
    [apiCoreApi.reducerPath]: apiCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiCoreApi.middleware),
});
