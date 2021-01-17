// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

// models
import { WorkExperience, WorkExperienceInterface } from "../../models/resume";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface PutWorkExperiencesRequestInterface {
  jwt: string;
  workExperiences: WorkExperienceInterface[];
}

export interface PutWorkExperiencesResponseInterface {
  workExperiences: WorkExperience[];
}

export async function putWorkExperiences(putWorkExperiencesRequest: PutWorkExperiencesRequestInterface): Promise<PutWorkExperiencesResponseInterface> {
  try {
    // deconstruct for ease
    const {
      jwt,
      workExperiences
    } = putWorkExperiencesRequest;

    // create and validate work experiences
    const newWorkExperiences = workExperiences.map((workExperience) => {
      return new WorkExperience(workExperience)
    });

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: {
        'content-type': 'application/json',
        authorization: jwt
      },
      data: {
        query: `mutation putWorkExperiences($data: PutWorkExperiencesInputType!) {
          putWorkExperiences(data: $data) {
            workExperiences {
              workExperienceId,
              startDate,
              endDate,
              companyName,
              companyAddress {
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode
              },
              position,
              duties,
              accomplishments
            }
          }
        }`,
        variables: {
          data: {
            workExperiences: newWorkExperiences.map((item: any) =>
              _.omitBy(_.assign({}, item, { _id: undefined }), _.isUndefined),
            ),
          },
        },
      }
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
    const putWorkExperiencesResponse = {
      workExperiences: httpResponse.data.data.putWorkExperiences.workExperiences
        .map((workExperience: WorkExperienceInterface) => new WorkExperience(workExperience)),
      moreWorkExperiences: httpResponse.data.data.putWorkExperiences.moreWorkExperiences,
      totalWorkExperiences: httpResponse.data.data.putWorkExperiences.totalWorkExperiences
    };
    console.log('putWorkExperiencesResponse=', putWorkExperiencesResponse)
    // return explicitly for end user to handle
    return putWorkExperiencesResponse;
  } catch (err) {
    console.log(`err.message`, err);
    console.log(`err`, err);
    throw err;
  }
}
