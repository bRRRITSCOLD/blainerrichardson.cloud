// libraries
import { _ } from '../../lib/utils';

export interface EmailStoreStateInterface {
  isSendingEmail: boolean,
  sendEmailError: any,
}

export const initialEmailStoreState: EmailStoreStateInterface = {
  isSendingEmail: false,
  sendEmailError: undefined
};

export function cachedEmailStoreState(_emailStoreState: EmailStoreStateInterface): Partial<EmailStoreStateInterface> {
  return _.assign(
    {}
  );
}
