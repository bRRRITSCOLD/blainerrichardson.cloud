// node_modules
import { mdiLinkedin, mdiGithub, mdiEmail, mdiFileDocument } from '@mdi/js';

// libraries
import { _ } from '../../lib/utils';

export interface AppStoreStateInterface {
  circleText: string;
  isChangingCircleText: boolean;
  iconLinks: { name: string; path: string; href?: string; }[];
}

export const initialAppStoreState: AppStoreStateInterface = {
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
};

export function hydrateAppStoreState(_appStoreState: AppStoreStateInterface): Partial<AppStoreStateInterface> {
  return _.assign(
    {}
  );
}
