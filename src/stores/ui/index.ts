// node_modules
import { writable } from "svelte/store";

// libraries
import { _ } from '../../lib/utils';

// store specific
import { initialUiStoreState } from "./state";
import { createUiStoreActions } from "./actions";
import { createUiStoreThunks } from "./thunks";
import { createUiStoreSelectors } from "./selectors";



function createUiStore() {
  // create writable
  const _uiStore = writable(_.assign({}, initialUiStoreState));

  // create writable
  const _uiStoreSelectors = createUiStoreSelectors(_uiStore);

  // create actions
  const _uiStoreActions = createUiStoreActions(_uiStore);

  // create thunks
  const _uiStoreThunks = createUiStoreThunks(_uiStoreActions);

  // return store
  return {
    update: _uiStore.update,
    subscribe: _uiStore.subscribe,
    set: (value: any) =>  {
      _uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          value
        )
      });
    },
    reset: () => _uiStore.set(initialUiStoreState),
    ..._uiStoreSelectors
    ..._uiStoreActions,
    ..._uiStoreThunks
  };
}

const uiStore = createUiStore();

export { uiStore };