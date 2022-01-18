import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const apiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "b5d631fcd9msh2b189873864848bp1abb81jsnfbb82d46130f",
};

const base_URL = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: apiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_URL }),
  endpoints: (builders) => ({
    getCryptos: builders.query({
      query: (number) => createRequest(`/coins?limit=${number}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
