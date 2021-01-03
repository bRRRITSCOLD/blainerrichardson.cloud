// node_modules
import { writable } from "svelte/store";
import { get as _get, assign } from 'lodash';

// libraries
import { _ } from '../../lib/utils';

// store specific
import { cachedUserStoreState, initialUserStoreState } from "./state";
import { createUserStoreActions } from "./actions";
import { createUserStoreThunks } from "./thunks";
import { createUserStoreSelectors } from "./selectors";
import { USER_STORE_KEY } from "./keys";



function createUserStore() {
  // get persisted item
  const storedUserStore = JSON.parse(sessionStorage.getItem(USER_STORE_KEY));

  // create writable
  const _userStore = writable(assign({}, initialUserStoreState, _.isObject(storedUserStore) ? storedUserStore : {}));

  // cache and uncache
  _userStore.subscribe(value => {
    sessionStorage.setItem(USER_STORE_KEY, JSON.stringify(cachedUserStoreState(value)));
  });

  // create writable
  const _userStoreSelectors = createUserStoreSelectors(_userStore);

  // create actions
  const _userStoreActions = createUserStoreActions(_userStore);

  // create thunks
  const _userStoreThunks = createUserStoreThunks(_userStoreActions);

  // return store
  return {
    update: _userStore.update,
    subscribe: _userStoreSelectors.subscribe,
    set: (value: any) =>  {
      _userStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          value
        )
      });
    },
    reset: () => _userStore.set(initialUserStoreState),
    ..._userStoreSelectors,
    ..._userStoreActions,
    ..._userStoreThunks
  };
}

const userStore = createUserStore();

export { userStore };
