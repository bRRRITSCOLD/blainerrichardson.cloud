// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

// models
import { WorkExperience, WorkExperienceInterface } from "../../models/resume";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface SearchWorkExperiencesResponseInterface {
  workExperiences: WorkExperience[];
  moreWorkExperiences: boolean;
  totalWorkExperiences: number;
}

export async function searchWorkExperiences(): Promise<SearchWorkExperiencesResponseInterface> {
  try {

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: { 'content-type': 'application/json' },
      data: {
        query: `{
          searchWorkExperiences(
            searchCriteria: {},
            searchOptions: {}
          ) {
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
            },
            moreWorkExperiences,
            totalWorkExperiences
          }
        }`
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
    const searchWorkExperiencesResponse = {
      workExperiences: httpResponse.data.data.searchWorkExperiences.workExperiences
        .map((workExperience: WorkExperienceInterface) => new WorkExperience(workExperience)),
      moreWorkExperiences: httpResponse.data.data.searchWorkExperiences.moreWorkExperiences,
      totalWorkExperiences: httpResponse.data.data.searchWorkExperiences.totalWorkExperiences
    };
    console.log('searchWorkExperiencesResponse=', searchWorkExperiencesResponse)
    // return explicitly for end user to handle
    return searchWorkExperiencesResponse;
  } catch (err) {
    console.log(`err.message`, err.message);
    console.log(`err`, err);
    throw err;
  }
}