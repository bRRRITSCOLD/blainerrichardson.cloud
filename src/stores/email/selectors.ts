
import { derived, Readable, Writable } from "svelte/store";
import type { EmailStoreStateInterface } from "./state";
import { _ } from '../../lib/utils';

export interface EmailStoreSelectorsInterface extends EmailStoreStateInterface {}

export const createEmailStoreSelectors = (emailStore: Writable<EmailStoreStateInterface & object>): Readable<EmailStoreSelectorsInterface> => {

  return derived(emailStore, $emailStore => ({
      isSendingEmail: $emailStore.isSendingEmail,
      sendEmailError: $emailStore.sendEmailError
    }));
}