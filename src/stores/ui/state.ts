// noce_modules
import { mdiLinkedin, mdiGithub, mdiEmail, mdiFileDocument } from '@mdi/js';

// libraries
import { _ } from '../../lib/utils';

export interface UiStoreStateInterface {
  circleText: string;
  isChangingCircleText: boolean;
  iconLinks: { name: string; path: string; href?: string; }[];
  isLoginModalOpen: boolean;
  isEmailModalOpen: boolean;
  isResumeModalOpen: boolean;
  isAdminNavigationDrawerOpen: boolean;
}

export const initialUiStoreState: UiStoreStateInterface = {
  circleText: '',
  isChangingCircleText: false,
  iconLinks: [
    {
      name: 'linkedin',
      path: mdiLinkedin,
      href: 'https://www.linkedin.com/in/blainerrichardson'
    },
    {
      name: 'github',
      path: mdiGithub,
      href: 'https://github.com/bRRRITSCOLD'
    },
    {
      name: 'email',
      path: mdiEmail
    },
    {
      name: 'resume',
      path: mdiFileDocument
    }
  ],
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
