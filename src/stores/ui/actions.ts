import type { Writable } from "svelte/store";
import type { UiStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';

export interface UiStoreActionsInterface {
  setCircleText: (circleText: string) => void;
  setIsChangingCircleText: (isChangingCircleText: boolean) => void;
  setIsLoginModalOpen: (isLoginModalOpen: boolean) => void;
  setIsEmailModalOpen: (isEmailModalOpen: boolean) => void;
  setIsResumeModalOpen: (isResumeModalOpen: boolean) => void;
  setIsAdminNavigationDrawerOpen: (isAdminNavigationDrawerOpen: boolean) => void;
}

export const createUiStoreActions = (uiStore: Writable<UiStoreStateInterface & object>): UiStoreActionsInterface => {

  return {
    setCircleText: (circleText: string) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { circleText }
        )
      });
    },
    setIsChangingCircleText: (isChangingCircleText: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isChangingCircleText }
        )
      });
    },
    setIsLoginModalOpen: (isLoginModalOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isLoginModalOpen }
        )
      });
    },
    setIsEmailModalOpen: (isEmailModalOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isEmailModalOpen }
        )
      });
    },
    setIsResumeModalOpen: (isResumeModalOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isResumeModalOpen }
        )
      });
    },
    setIsAdminNavigationDrawerOpen: (isAdminNavigationDrawerOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isAdminNavigationDrawerOpen }
        )
      });
    }
  }
}