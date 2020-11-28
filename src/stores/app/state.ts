// node_modules
import { mdiLinkedin, mdiGithub, mdiEmail } from '@mdi/js';

// libraries
import { _ } from '../../lib/utils';

export interface AppStoreStateInterface {
  circleText: string;
  isChangingCircleText: boolean;
  iconLinks: { name: string; path: string; color: string; }[];
}

export const initialAppStoreState: AppStoreStateInterface = {
  circleText: '',
  isChangingCircleText: false,
  iconLinks: [
    {
      name: 'linkedin',
      path: mdiLinkedin,
      color: 'black'
    },
    {
      name: 'github',
      path: mdiGithub,
      color: 'black'
    },
    {
      name: 'email',
      path: mdiEmail,
      color: 'black'
    }
  ],
};

export function hydrateAppStoreState(_appStoreState: AppStoreStateInterface): Partial<AppStoreStateInterface> {
  return _.assign(
    {}
  );
}
