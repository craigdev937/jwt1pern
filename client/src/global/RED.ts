import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserAPI } from "./UserAPI";

export const RED = configureStore({
    reducer: {
        [UserAPI.reducerPath]: UserAPI.reducer,
    },      // gDM = getDefaultMiddleare.
    middleware: (gDM) => gDM().concat(UserAPI.middleware)
});

setupListeners(RED.dispatch);
export type RootState = ReturnType<typeof RED.getState>;
export type AppDispatch = typeof RED.dispatch;


