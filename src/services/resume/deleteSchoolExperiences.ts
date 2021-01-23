export {};// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface DeleteSchoolExperiencesRequestInterface {
  jwt: string;
  schoolExperienceIds: string[];
}

export interface DeleteSchoolExperiencesResponseInterface {
  schoolExperienceIds: string[];
}

export async function deleteSchoolExperiences(deleteSchoolExperiencesRequest: DeleteSchoolExperiencesRequestInterface): Promise<DeleteSchoolExperiencesResponseInterface> {
  try {
    // deconstruct for ease
    const {
      jwt,
      schoolExperienceIds
    } = deleteSchoolExperiencesRequest;

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: {
        'content-type': 'application/json',
        authorization: jwt
      },
      data: {
        query: `mutation deleteSchoolExperiences($data: DeleteSchoolExperiencesInputType!) {
          deleteSchoolExperiences(data: $data) {
            schoolExperienceIds
          }
        }`,
        variables: {
          data: {
            schoolExperienceIds
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
    const deleteSchoolExperiencesResponse = {
      schoolExperienceIds: httpResponse.data.data.deleteSchoolExperiences.schoolExperienceIds
    };

    // return explicitly for end user to handle
    return deleteSchoolExperiencesResponse;
  } catch (err) {
    // throw error explicitly for user to handle
    throw err;
  }
}
