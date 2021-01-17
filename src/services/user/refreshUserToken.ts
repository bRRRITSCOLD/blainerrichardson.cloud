// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

const apiUrl = `http://127.0.0.1:3000/graphql`;

export interface RefreshUserTokenRequestInterface {
  jwt: string;
}

export interface RefreshUserTokenResponseInterface {
  user: any;
  userToken: any;
}

export async function refreshUserToken(
  refreshUserTokenRequest: RefreshUserTokenRequestInterface
): Promise<RefreshUserTokenResponseInterface> {
  try {
    // deconstruct for ease
    const { jwt } = refreshUserTokenRequest;

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: { 'content-type': 'application/json', authorization: jwt },
      data: {
        query: `mutation { refreshUserToken {
            user {
              firstName
            },
            userToken {
              userTokenId,
              token
            }
          }
        }`,
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
    const refreshUserTokenResponse = {
      user: httpResponse.data.data.refreshUserToken.user,
      userToken: httpResponse.data.data.refreshUserToken.userToken,
    };
    console.log('refreshUserTokenResponse=', refreshUserTokenResponse)
    // return explicitly for end user to handle
    return refreshUserTokenResponse;
  } catch (err) {
    console.log(`err.message`, err.message);
    console.log(`err`, err);
    throw err;
  }
}