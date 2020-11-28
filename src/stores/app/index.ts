// node_modules
import { writable } from "svelte/store";
import { get as _get, assign } from 'lodash';

// libraries
import { _ } from '../../lib/utils';

// store specific
import { initialAppStoreState } from "./state";
import { createAppStoreActions } from "./actions";
import { createAppStoreThunks } from "./thunks";



function createAppStore() {
  // create writable
  const _appStore = writable(assign({}, initialAppStoreState));
  // create actions
  const _appStoreActions = createAppStoreActions(_appStore);
  // create thunks
  const _appStoreThunks = createAppStoreThunks(_appStoreActions);
  // return store
  return {
    update: _appStore.update,
    subscribe: _appStore.subscribe,
    reset: () => _appStore.set(initialAppStoreState),
    ..._appStoreActions,
    ..._appStoreThunks
  };
}

const appStore = createAppStore();

export { appStore };
