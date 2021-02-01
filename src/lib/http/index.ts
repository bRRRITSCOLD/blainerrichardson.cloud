// node_modules
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// stores
import { userStore } from '../../stores/user';

// create a new base axios iinstance
const httpClient = axios.create({
  withCredentials: true
});

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

function getIsRefreshingUserToken(): boolean {
  let isRefreshingUserToken: boolean;
  const unsubscribe = userStore.subscribe((item) => isRefreshingUserToken = item.isRefreshingUserToken);
  unsubscribe();
  return isRefreshingUserToken;
}

function getJwt(): string {
  let jwt: string;
  const unsubscribe = userStore.subscribe((item) => jwt = item.jwt);
  unsubscribe();
  return jwt;
}

// Function that will be called to refresh authorization
const refreshAuthLogic = async failedRequest => {
  let wasRefreshingUserToken = false;

  while (getIsRefreshingUserToken()) {
    wasRefreshingUserToken = true;
  }

  userStore.stopPollingRefreshUserToken();

  if (wasRefreshingUserToken) {
    throw new Error('Failed to refresh');
  } else if (!wasRefreshingUserToken) {
    await userStore.refreshUserToken({
      jwt: getJwt()
    });
  }

  userStore.startPollingRefreshUserToken({ jwt: getJwt() });

  failedRequest.response.config.headers['auhtorization'] = getJwt();
  return Promise.resolve();
};
 
// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(
  axios,
  refreshAuthLogic,
  { pauseInstanceWhileRefreshing: true }
);
 
export { httpClient }
