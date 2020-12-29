// node_modules
import { writable } from "svelte/store";
import { get as _get, assign } from 'lodash';

// libraries
import { _ } from '../../lib/utils';

// store specific
import { initialUiStoreState } from "./state";
import { createUiStoreActions } from "./actions";
import { createUiStoreThunks } from "./thunks";



function createUiStore() {
  // create writable
  const _uiStore = writable(assign({}, initialUiStoreState));
  // create actions
  const _uiStoreActions = createUiStoreActions(_uiStore);
  // create thunks
  const _uiStoreThunks = createUiStoreThunks(_uiStoreActions);
  // return store
  return {
    update: _uiStore.update,
    subscribe: _uiStore.subscribe,
    reset: () => _uiStore.set(initialUiStoreState),
    ..._uiStoreActions,
    ..._uiStoreThunks
  };
}

const uiStore = createUiStore();

export { uiStore };
