// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";
import { Email, EmailInterface } from "../../models/email";

const apiUrl = `http://127.0.0.1:3000/graphql`;

export interface SendEmailRequestInterface {
  email: EmailInterface;
}

export interface SendEmailResponseInterface {
  messageId: string;
  email: EmailInterface;
}

export async function sendEmail(
  sendEmailRequest: SendEmailRequestInterface
): Promise<SendEmailResponseInterface> {
  try {
    // deconstruct for ease
    const { email } = sendEmailRequest;

    // create a new email instance and validate
    const newEmail = new Email(email)
    const newEmailValidateResponse = await newEmail.validateAsync();
    if (newEmailValidateResponse.error) throw newEmailValidateResponse.error;

    console.log(`newEmail`, newEmail);
    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: { 'content-type': 'application/json' },
      data: {
        query: `mutation sendEmail($data: SendEmailInputType!) {
          sendEmail(data: $data) {
            messageId,
            email {
              from {
                name,
                address
              },
              to {
                name,
                address
              },
              subject,
              text
            }
          }
        }`,
        variables: {
          data: {
            email: _.omitBy(newEmail, _.isUndefined),
          },
        },
      }
    };
    const httpResponse = await httpClient(httpRequest as any);

    // validate/verify the http status
    if (httpResponse.status !== 200) {
      throw _.assign(
        {},
        httpResponse.data,
        { statusCode: httpResponse.status }
      )
    }
    console.log('httpResponse', httpResponse.data.data)
    // build and return response explicitly
    const sendEmailResponse = {
      messageId: httpResponse.data.data.sendEmail.messageId,
      email: httpResponse.data.data.sendEmail.email,
    };
    console.log('sendEmailResponse=', sendEmailResponse)
    // return explicitly for end user to handle
    return sendEmailResponse;
  } catch (err) {
    console.log(`err.message`, err.message);
    console.log(`err`, err);
    throw err;
  }
}