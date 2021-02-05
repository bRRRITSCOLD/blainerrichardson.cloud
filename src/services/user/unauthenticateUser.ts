// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

const apiUrl = `http://127.0.0.1:3000/graphql`;

export interface UnauthenticateUserRequestInterface {}

export interface UnauthenticateUserResponseInterface {
  success: boolean;
}

export async function unauthenticateUser(): Promise<UnauthenticateUserResponseInterface> {
  try {
    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: { 'content-type': 'application/json' },
      data: {
        query: `mutation { unauthenticateUser {
            success
          }
        }`,
      }
    };
    const httpResponse = await httpClient(httpRequest as any);
    console.log('httpResponse', httpResponse);
    // validate/verify the http status
    if (httpResponse.status !== 200) {
      throw _.assign(
        {},
        httpResponse.data,
        { statusCode: httpResponse.status }
      )
    }
  
    // build and return response explicitly
    const unauthenticateUserResponse = {
      success: httpResponse.data.data.unauthenticateUser.success,
    };
  
    // return explicitly for end user to handle
    return unauthenticateUserResponse;
  } catch (err) {
    console.log(`unauthenticateUser.error`, err);

    throw err;
  }
}