// node_modules
import { derived, Readable, Writable } from "svelte/store";

// libraries
import { _ } from '../../lib/utils';

 // store
import type { UserStoreStateInterface } from "./state";

export interface UserStoreSelectorsInterface extends UserStoreStateInterface {
  isAuthenticated: boolean;
}

export const createUserStoreSelectors = (userStore: Writable<UserStoreStateInterface & object>): Readable<UserStoreSelectorsInterface> => {

  return derived(userStore, $userStore => ({
      user: $userStore.user,
      jwt: $userStore.jwt,
  
      isAuthenticatingUser: $userStore.isAuthenticatingUser,
      authenticateUserError: $userStore.authenticateUserError,
      isAuthenticated: _.isString($userStore.jwt) && $userStore.jwt.length > 0,

      isUnauthenticatingUser: $userStore.isUnauthenticatingUser,
      unauthenticateUserError: $userStore.unauthenticateUserError,
  
      isRefreshingUserToken: $userStore.isRefreshingUserToken,
      refreshUserTokenError: $userStore.refreshUserTokenError,

      isPollingRefreshUserToken: $userStore.isPollingRefreshUserToken,
    }));
}