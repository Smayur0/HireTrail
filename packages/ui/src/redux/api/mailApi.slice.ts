import { apiSlice } from "./api.slice";
import type { EmailsResponse, FetchMailsResponse } from "../types/mail.types";

export const mailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMails: builder.mutation<FetchMailsResponse, void>({
      query: () => ({
        url: "/mail/allmails",
        method: "GET",
      }),
      invalidatesTags: ["Mail"],
    }),
    getSavedEmails: builder.query<EmailsResponse, { limit?: number; offset?: number }>({
      query: ({ limit = 200, offset = 0 } = {}) => ({
        url: "/mail/saved",
        method: "GET",
        params: { limit, offset },
      }),
      providesTags: ["Mail"],
    }),
  }),
});

export const { useFetchMailsMutation, useGetSavedEmailsQuery } = mailApiSlice;
