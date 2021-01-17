export {};// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

// models
import { WorkExperience, WorkExperienceInterface } from "../../models/resume";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface DeleteWorkExperiencesRequestInterface {
  jwt: string;
  workExperienceIds: string[];
}

export interface DeleteWorkExperiencesResponseInterface {
  workExperienceIds: string[];
}

export async function deleteWorkExperiences(deleteWorkExperiencesRequest: DeleteWorkExperiencesRequestInterface): Promise<DeleteWorkExperiencesResponseInterface> {
  try {
    // deconstruct for ease
    const {
      jwt,
      workExperienceIds
    } = deleteWorkExperiencesRequest;

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: {
        'content-type': 'application/json',
        authorization: jwt
      },
      data: {
        query: `mutation deleteWorkExperiences($data: DeleteWorkExperiencesInputType!) {
          deleteWorkExperiences(data: $data) {
            workExperienceIds
          }
        }`,
        variables: {
          data: {
            workExperienceIds
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
    console.log('httpResponse', httpResponse.data.data)

    // build and return response explicitly
    const deleteWorkExperiencesResponse = {
      workExperienceIds: httpResponse.data.data.deleteWorkExperiences.workExperienceIds
    };
    console.log('deleteWorkExperiencesResponse=', deleteWorkExperiencesResponse)
    // return explicitly for end user to handle
    return deleteWorkExperiencesResponse;
  } catch (err) {
    console.log(`err.message`, err);
    console.log(`err`, err);
    throw err;
  }
}
