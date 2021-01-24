import type { Writable } from "svelte/store";
import type { UiStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';

export interface UiStoreActionsInterface {
  setCircleText: (circleText: string) => void;
  setIsChangingCircleText: (isChangingCircleText: boolean) => void;

  setIsLoginDialogOpen: (isLoginDialogOpen: boolean) => void;
  setIsEmailDialogOpen: (isEmailDialogOpen: boolean) => void;
  setIsResumeDialogOpen: (isResumeDialogOpen: boolean) => void;
  setIsAddWorkExperienceDialogOpen: (isAddWorkExperienceDialogOpen: boolean) => void;
  setIsAddSchoolExperienceDialogOpen: (isAddSchoolExperienceDialogOpen: boolean) => void;
  setIsAddCertificationDialogOpen: (isAddCertificationDialogOpen: boolean) => void;
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
  
    setIsLoginDialogOpen: (isLoginDialogOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isLoginDialogOpen }
        )
      });
    },
    setIsEmailDialogOpen: (isEmailDialogOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isEmailDialogOpen }
        )
      });
    },
    setIsResumeDialogOpen: (isResumeDialogOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isResumeDialogOpen }
        )
      });
    },
    setIsAddWorkExperienceDialogOpen: (isAddWorkExperienceDialogOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isAddWorkExperienceDialogOpen }
        )
      });
    },
    setIsAddSchoolExperienceDialogOpen: (isAddSchoolExperienceDialogOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isAddSchoolExperienceDialogOpen }
        )
      });
    },
    setIsAddCertificationDialogOpen: (isAddCertificationDialogOpen: boolean) => {
      uiStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isAddCertificationDialogOpen }
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