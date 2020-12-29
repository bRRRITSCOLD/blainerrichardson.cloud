// libraries
import { _ } from '../../lib/utils';

export interface UiStoreStateInterface {
  isLoginModalOpen: boolean;
  isEmailModalOpen: boolean;
  isResumeModalOpen: boolean;
}

export const initialUiStoreState: UiStoreStateInterface = {
  isLoginModalOpen: false,
  isEmailModalOpen: false,
  isResumeModalOpen: false,
};

export function hydrateUiStoreState(_uiStoreState: UiStoreStateInterface): Partial<UiStoreStateInterface> {
  return _.assign(
    {}
  );
}
