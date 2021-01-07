// node_modules
import { writable } from "svelte/store";
import { get as _get, assign } from 'lodash';

// libraries
import { _ } from '../../lib/utils';

// store specific
import { cachedResumeStoreState, initialResumeStoreState } from "./state";
import { createResumeStoreActions } from "./actions";
import { createResumeStoreThunks } from "./thunks";
import { createResumeStoreSelectors } from "./selectors";
import { RESUME_STORE_KEY } from "./keys";



function createResumeStore() {
  // get persisted item
  const storedResumeStore = JSON.parse(sessionStorage.getItem(RESUME_STORE_KEY));

  // create writable
  const _resumeStore = writable(assign({}, initialResumeStoreState, _.isObject(storedResumeStore) ? storedResumeStore : {}));

  // cache and uncache
  _resumeStore.subscribe(value => {
    sessionStorage.setItem(RESUME_STORE_KEY, JSON.stringify(cachedResumeStoreState(value)));
  });

  // create writable
  const _resumeStoreSelectors = createResumeStoreSelectors(_resumeStore);

  // create actions
  const _resumeStoreActions = createResumeStoreActions(_resumeStore);

  // create thunks
  const _resumeStoreThunks = createResumeStoreThunks(_resumeStoreActions);

  // return store
  return {
    update: _resumeStore.update,
    subscribe: _resumeStoreSelectors.subscribe,
    set: (value: any) =>  {
      _resumeStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          value
        )
      });
    },
    reset: () => _resumeStore.set(initialResumeStoreState),
    ..._resumeStoreSelectors,
    ..._resumeStoreActions,
    ..._resumeStoreThunks
  };
}

const resumeStore = createResumeStore();

export { resumeStore };
