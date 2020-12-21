import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// create a new base axios iinstance
const httpClient = axios.create();

// initiate any interceptors we would like to have
httpClient.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    return request;
  },
  (error: any) => {
    return error;
  }
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    return error;
  }
);

export { httpClient }
