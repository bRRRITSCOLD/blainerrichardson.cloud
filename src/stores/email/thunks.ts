// libraries
import { _ } from '../../lib/utils';

// models
import type { EmailInterface } from '../../models/email';

// services
import * as emailService from '../../services/email';

// store specific
import type { EmailStoreActionsInterface } from "./actions";

export interface EmailStoreThunksInterface {
  sendEmail: (sendEmailRequest: { email: EmailInterface }) => void;
}

export const createEmailStoreThunks = (emailStoreActions: EmailStoreActionsInterface): EmailStoreThunksInterface => {

  return {
    sendEmail: async (sendEmailRequest) => {
      try {
        // deconstruct for ease
        const { email } = sendEmailRequest;

        // indicate that we are sending an email
        emailStoreActions.setIsSendingEmail(true);

        // log email for now
        console.log(email);
        console.log(sendEmailRequest);
        const sendEmailResponse = await emailService.sendEmail({
          email
        });
        console.log(email);

        // indicate that we are sending an email
        emailStoreActions.setIsSendingEmail(false);

        // return explictly to make sure
        // the closure closes
        return;
      } catch (err) {
        console.log(`sendEmailError`, err);
        // indicate that we are sending an email
        emailStoreActions.setIsSendingEmail(false);

        // thow error explicitly
        throw err;
      }
    }
  }
}