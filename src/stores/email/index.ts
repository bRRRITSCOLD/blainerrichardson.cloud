// node_modules
import { writable } from "svelte/store";

// libraries
import { _ } from '../../lib/utils';

// store specific
import { initialEmailStoreState } from "./state";
import { createEmailStoreActions } from "./actions";
import { createEmailStoreThunks } from "./thunks";
import { createEmailStoreSelectors } from "./selectors";



function createEmailStore() {
  // create writable
  const _emailStore = writable(_.assign({}, initialEmailStoreState));

  // create writable
  const _emailStoreSelectors = createEmailStoreSelectors(_emailStore);

  // create actions
  const _emailStoreActions = createEmailStoreActions(_emailStore);

  // create thunks
  const _emailStoreThunks = createEmailStoreThunks(_emailStoreActions);

  // return store
  return {
    update: _emailStore.update,
    subscribe: _emailStore.subscribe,
    set: (value: any) =>  {
      _emailStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          value
        )
      });
    },
    reset: () => _emailStore.set(initialEmailStoreState),
    ..._emailStoreSelectors,
    ..._emailStoreActions,
    ..._emailStoreThunks
  };
}

const emailStore = createEmailStore();

export { emailStore };