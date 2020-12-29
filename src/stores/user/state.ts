// libraries
import { _ } from '../../lib/utils';

export interface UserStoreStateInterface {
  user: { firstName: string; lastName: string; userId: string; username: string; roles: string };
  jwt: string;
  isAuthenticatingUser: boolean;
  authenticateUserError: any;
}

export const initialUserStoreState: UserStoreStateInterface = {
  user: undefined,
  jwt: '',
  isAuthenticatingUser: false,
  authenticateUserError: undefined
};

export function hydrateUserStoreState(_userStoreState: UserStoreStateInterface): Partial<UserStoreStateInterface> {
  return _.assign(
    {}
  );
}
