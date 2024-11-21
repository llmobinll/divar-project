import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { divarApi } from "../services/divarApi";

export const store = configureStore({
  reducer: {
    [divarApi.reducerPath]: divarApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(divarApi.middleware),
});

setupListeners(store.dispatch);
