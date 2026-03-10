import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IData } from "../models/Interfaces";
const URL = "http://localhost:9000/api/user";

export const UserAPI = createApi({
    reducerPath: "UserAPI",
    tagTypes: ["Users"],
    baseQuery: fetchBaseQuery({ baseUrl: `${URL}` }),
    endpoints: (builder) => ({
        allUsers: builder.query<IData, void>({
            query: () => ({
                url: "/",
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
    })
});



