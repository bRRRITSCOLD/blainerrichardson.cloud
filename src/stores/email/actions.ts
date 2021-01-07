import type { Writable } from "svelte/store";
import type { EmailStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';

export interface EmailStoreActionsInterface {
  setIsSendingEmail: (isSendingEmail: boolean) => void;
  setSendEmailError: (sendEmailError: any) => void;
}

export const createEmailStoreActions = (emailStore: Writable<EmailStoreStateInterface & object>): EmailStoreActionsInterface => {

  return {
    setIsSendingEmail: (isSendingEmail: boolean) => {
      emailStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { isSendingEmail }
        )
      });
    },
    setSendEmailError: (sendEmailError: boolean) => {
      emailStore.update(state => {
        // return the new state
        return _.assign(
          {},
          state,
          { sendEmailError }
        )
      });
    }
  }
}