// eslint-disable-next-line import/named
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { STRAPI_BASE_URL } from "../constants";

/**
 * ! Caution I plan on using axios only for data fetching on the server
*/
const instance = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
});

instance.defaults.headers.common["Authorization"] =
  `Bearer ${(process.env.STRAPI_READ_ONLY_API_TOKEN || "undefined-token").trim()}`;

const responseBody = <O>(response: AxiosResponse<O>) => response.data;

export const client = {
  get: <O>(url: string, config?: AxiosRequestConfig): Promise<O> => 
    instance.get<O>(url, config).then(responseBody),
  post: <I, O>(url: string, body: I, config?: AxiosRequestConfig): Promise<O> =>
    instance.post<O>(url, body, config).then(responseBody),
  put: <I, O>(url: string, body: I, config?: AxiosRequestConfig): Promise<O> =>
    instance.put<O>(url, body, config).then(responseBody),
  delete: <O>(url: string, config?: AxiosRequestConfig): Promise<O> =>
    instance.delete<O>(url, config).then(responseBody),
};
