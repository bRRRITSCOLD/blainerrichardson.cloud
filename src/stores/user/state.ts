// libraries
import { _ } from '../../lib/utils';

export interface UserStoreStateInterface {
  user: { firstName: string; lastName: string; userId: string; username: string; roles: string };
  jwt: string;
  isAuthenticatingUser: boolean;
  authenticateUserError: any;
  isPollingRefreshUserToken: boolean;
}

export const initialUserStoreState: UserStoreStateInterface = {
  user: undefined,
  jwt: '',
  isAuthenticatingUser: false,
  authenticateUserError: undefined,
  isPollingRefreshUserToken: false
};

export function cachedUserStoreState(_userStoreState: UserStoreStateInterface): Partial<UserStoreStateInterface> {
  return _.assign(
    {},
    { user: _userStoreState.user, jwt: _userStoreState.jwt  }
  );
}
