// node_modules
import { writable } from "svelte/store";
import { get as _get, assign } from 'lodash';

// libraries
import { _ } from '../../lib/utils';

// store specific
import { initialUserStoreState } from "./state";
import { createUserStoreActions } from "./actions";
import { createUserStoreThunks } from "./thunks";



function createUserStore() {
  // create writable
  const _userStore = writable(assign({}, initialUserStoreState));
  // create actions
  const _userStoreActions = createUserStoreActions(_userStore);
  // create thunks
  const _userStoreThunks = createUserStoreThunks(_userStoreActions);
  // return store
  return {
    update: _userStore.update,
    subscribe: _userStore.subscribe,
    reset: () => _userStore.set(initialUserStoreState),
    ..._userStoreActions,
    ..._userStoreThunks
  };
}

const userStore = createUserStore();

export { userStore };
