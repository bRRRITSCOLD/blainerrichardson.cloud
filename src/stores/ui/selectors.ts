
import { derived, Readable, Writable } from "svelte/store";
import type { UiStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';

export interface UiStoreSelectorsInterface extends UiStoreStateInterface {}

export const createUiStoreSelectors = (uiStore: Writable<UiStoreStateInterface & object>): Readable<UiStoreSelectorsInterface> => {

  return derived(uiStore, $uiStore => ({
    circleText: $uiStore.circleText,
    isChangingCircleText: $uiStore.isChangingCircleText,
    iconLinks: $uiStore.iconLinks,
    isEmailModalOpen: $uiStore.isEmailModalOpen,
    isLoginDialogOpen: $uiStore.isLoginDialogOpen,
    isResumeModalOpen: $uiStore.isResumeModalOpen,
    isAdminNavigationDrawerOpen: $uiStore.isAdminNavigationDrawerOpen
    }));
}