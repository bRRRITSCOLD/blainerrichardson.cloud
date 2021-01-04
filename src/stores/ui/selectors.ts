
import { derived, Readable, Writable } from "svelte/store";
import type { UiStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';

export interface UiStoreSelectorsInterface extends UiStoreStateInterface {}

export const createUiStoreSelectors = (uiStore: Writable<UiStoreStateInterface & object>): Readable<UiStoreSelectorsInterface> => {

  return derived(uiStore, $uiStore => ({
      isEmailModalOpen: $uiStore.isEmailModalOpen,
      isLoginModalOpen: $uiStore.isLoginModalOpen,
      isResumeModalOpen: $uiStore.isResumeModalOpen,
      isAdminNavigationDrawerOpen: $uiStore.isAdminNavigationDrawerOpen
    }));
}