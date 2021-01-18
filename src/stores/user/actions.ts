import type { Writable } from "svelte/store";
import type { UserStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';

export interface UserStoreActionsInterface {
  setUser: (user: any) => void;
  setJwt: (jwt: string) => void;
  setIsAuthenticatingUser: (isAuthenticatingUser: boolean) => void;
  setAuthenticateUserError: (authenticateUserError: any) => void;
  setIsRefreshingUserToken: (isRefreshingUserToken: boolean) => void;
  setRefreshUserTokenError: (refreshUserTokenError: any) => void;
  setIsPollingRefreshUserToken: (isPollingRefreshUserToken: boolean) => void;
}

export const createUserStoreActions = (userStore: Writable<UserStoreStateInterface & object>): UserStoreActionsInterface => {

  return {
    setUser: (user: any) => {
      userStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { user }
        )
      });
    },
    setJwt: (jwt: string) => {
      userStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { jwt }
        )
      });
    },
    setIsAuthenticatingUser: (isAuthenticatingUser: boolean) => {
      userStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isAuthenticatingUser }
        )
      });
    },
    setAuthenticateUserError: (authenticateUserError: any) => {
      userStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { authenticateUserError }
        )
      });
    },
    setIsRefreshingUserToken: (isRefreshingUserToken: boolean) => {
      userStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isRefreshingUserToken }
        )
      });
    },
    setRefreshUserTokenError: (refreshUserTokenError: any) => {
      userStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { refreshUserTokenError }
        )
      });
    },
    setIsPollingRefreshUserToken: (isPollingRefreshUserToken: boolean) => {
      userStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isPollingRefreshUserToken }
        )
      });
    }
  }
}