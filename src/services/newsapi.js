import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const apinewsHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "b5d631fcd9msh2b189873864848bp1abb81jsnfbb82d46130f",
};

const base_URL = "https://bing-news-search1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: apinewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_URL }),
  endpoints: (builders) => ({
    getCryptoNews: builders.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search/?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
