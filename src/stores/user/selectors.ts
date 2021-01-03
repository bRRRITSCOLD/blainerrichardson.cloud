// node_modules
import { derived, Readable, Writable } from "svelte/store";

// libraries
import { _ } from '../../lib/utils';

 // store
import type { UserStoreStateInterface } from "./state";

export interface UserStoreSelectorsInterface extends UserStoreStateInterface {
  isAuthenticated: boolean;
}

export const createUserStoreSelectors = (uiStore: Writable<UserStoreStateInterface & object>): Readable<UserStoreSelectorsInterface> => {

  return derived(uiStore, $uiStore => ({
      user: $uiStore.user,
      jwt: $uiStore.jwt,
      isAuthenticatingUser: $uiStore.isAuthenticatingUser,
      authenticateUserError: $uiStore.authenticateUserError,
      isAuthenticated: _.isString($uiStore.jwt) && $uiStore.jwt.length > 0
    }));
}