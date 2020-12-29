// libraries
import { _ } from '../../lib/utils';

// store specific
import type { UiStoreActionsInterface } from "./actions";

export interface UiStoreThunksInterface {
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openEmailModal: () => void;
  closeEmailModal: () => void;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

export const createUiStoreThunks = (uiStoreActions: UiStoreActionsInterface): UiStoreThunksInterface => {

  return {
    openLoginModal: async () => {
      uiStoreActions.setIsLoginModalOpen(true);
    },
    closeLoginModal: async () => {
      uiStoreActions.setIsLoginModalOpen(false);
    },
    openEmailModal: async () => {
      uiStoreActions.setIsEmailModalOpen(true);
    },
    closeEmailModal: async () => {
      uiStoreActions.setIsEmailModalOpen(false);
    },
    openResumeModal: async () => {
      uiStoreActions.setIsResumeModalOpen(true);
    },
    closeResumeModal: async () => {
      uiStoreActions.setIsResumeModalOpen(false);
    }
  }
}