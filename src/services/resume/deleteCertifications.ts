export {};// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface DeleteCertificationsRequestInterface {
  jwt: string;
  certificationIds: string[];
}

export interface DeleteCertificationsResponseInterface {
  certificationIds: string[];
}

export async function deleteCertifications(deleteCertificationsRequest: DeleteCertificationsRequestInterface): Promise<DeleteCertificationsResponseInterface> {
  try {
    // deconstruct for ease
    const {
      jwt,
      certificationIds
    } = deleteCertificationsRequest;

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: {
        'content-type': 'application/json',
        authorization: jwt
      },
      data: {
        query: `mutation deleteCertifications($data: DeleteCertificationsInputType!) {
          deleteCertifications(data: $data) {
            certificationIds
          }
        }`,
        variables: {
          data: {
            certificationIds
          },
        },
      },
    };
    const httpResponse = await httpClient(httpRequest as any);

    // validate/verify the http status
    if (httpResponse.status !== 200) {
      throw _.assign(
        {},
        httpResponse,
        { statusCode: httpResponse.status }
      )
    }

    // build and return response explicitly
    const deleteCertificationsResponse = {
      certificationIds: httpResponse.data.data.deleteCertifications.certificationIds
    };

    // return explicitly for end user to handle
    return deleteCertificationsResponse;
  } catch (err) {
    // throw error explicitly for user to handle
    throw err;
  }
}
