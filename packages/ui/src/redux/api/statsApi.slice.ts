import { apiSlice } from "./api.slice";
import type { StatsResponse } from "../types/mail.types";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobStats: builder.query<StatsResponse, void>({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetJobStatsQuery } = statsApiSlice;
