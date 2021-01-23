// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

// models
import { SchoolExperience, SchoolExperienceInterface } from "../../models/resume";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface PutSchoolExperiencesRequestInterface {
  jwt: string;
  schoolExperiences: SchoolExperienceInterface[];
}

export interface PutSchoolExperiencesResponseInterface {
  schoolExperiences: SchoolExperience[];
}

export async function putSchoolExperiences(putSchoolExperiencesRequest: PutSchoolExperiencesRequestInterface): Promise<PutSchoolExperiencesResponseInterface> {
  try {
    // deconstruct for ease
    const {
      jwt,
      schoolExperiences
    } = putSchoolExperiencesRequest;

    // create and validate work experiences
    const newSchoolExperiences = schoolExperiences.map((schoolExperience) => {
      return new SchoolExperience(schoolExperience)
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
        query: `mutation putSchoolExperiences($data: PutSchoolExperiencesInputType!) {
          putSchoolExperiences(data: $data) {
            schoolExperiences {
              schoolExperienceId,
              startDate,
              endDate,
              schoolName,
              schoolAddress {
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode
              },
              degree,
              classes
            }
          }
        }`,
        variables: {
          data: {
            schoolExperiences: newSchoolExperiences.map((item: any) =>
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

    // build and return response explicitly
    const putSchoolExperiencesResponse = {
      schoolExperiences: httpResponse.data.data.putSchoolExperiences.schoolExperiences
        .map((schoolExperience: SchoolExperienceInterface) => new SchoolExperience(schoolExperience)),
      moreSchoolExperiences: httpResponse.data.data.putSchoolExperiences.moreSchoolExperiences,
      totalSchoolExperiences: httpResponse.data.data.putSchoolExperiences.totalSchoolExperiences
    };

    // return explicitly for end user to handle
    return putSchoolExperiencesResponse;
  } catch (err) {
    console.log('err', err)
    // throw error explicitly for user to handle
    throw err;
  }
}
