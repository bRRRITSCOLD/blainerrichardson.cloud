// node_modules
import { writable } from "svelte/store";
import { get as _get, assign } from 'lodash';

// libraries
import { _ } from '../../lib/utils';

// store specific
import { initialUserStoreState } from "./state";
import { createUserStoreActions } from "./actions";
import { createUserStoreThunks } from "./thunks";
import { createUserStoreSelectors } from "./selectors";



function createUserStore() {
  // create writable
  const _userStore = writable(assign({}, initialUserStoreState));

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
