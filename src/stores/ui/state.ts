// libraries
import { _ } from '../../lib/utils';

export interface UiStoreStateInterface {
  isLoginModalOpen: boolean;
  isEmailModalOpen: boolean;
  isResumeModalOpen: boolean;
  isAdminNavigationDrawerOpen: boolean;
}

export const initialUiStoreState: UiStoreStateInterface = {
  isLoginModalOpen: false,
  isEmailModalOpen: false,
  isResumeModalOpen: false,
  isAdminNavigationDrawerOpen: false
};

export function cachedUiStoreState(_uiStoreState: UiStoreStateInterface): Partial<UiStoreStateInterface> {
  return _.assign(
    {}
  );
}
