// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

const apiUrl = `http://127.0.0.1:3000/graphql`;

export interface AuthenticateUserRequestInterface {
  username: string;
  password: string;
}

export interface AuthenticateUserResponseInterface {
  user: any;
  userToken: any;
}

export async function authenticateUser(
  authenticateUserRequest: AuthenticateUserRequestInterface
): Promise<AuthenticateUserResponseInterface> {
  try {
    // deconstruct for ease
    const { username, password } = authenticateUserRequest;

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: { 'content-type': 'application/json' },
      data: {
        query: `mutation authenticateUser($data: AuthenticateUserInputType!) {
          authenticateUser(data: $data) {
            user {
              firstName,
              lastName,
              username,
              userId,
              roles
            },
            userToken {
              tokenType,
              token
            }
          }
        }`,
        variables: {
          data: {
            username,
            password,
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
    const authenticateUserResponse = {
      user: httpResponse.data.data.authenticateUser.user,
      userToken: httpResponse.data.data.authenticateUser.userToken,
    };
    console.log('authenticateUserResponse=', authenticateUserResponse)
    // return explicitly for end user to handle
    return authenticateUserResponse;
  } catch (err) {
    console.log(`err.message`, err.message);
    console.log(`err`, err);
    throw err;
  }
}