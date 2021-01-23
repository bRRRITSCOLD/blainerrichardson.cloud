// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

// models
import { SchoolExperience, SchoolExperienceInterface } from "../../models/resume";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface SearchSchoolExperiencesResponseInterface {
  schoolExperiences: SchoolExperience[];
  moreSchoolExperiences: boolean;
  totalSchoolExperiences: number;
}

export async function searchSchoolExperiences(): Promise<SearchSchoolExperiencesResponseInterface> {
  try {

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: { 'content-type': 'application/json' },
      data: {
        query: `{
          searchSchoolExperiences(
            searchCriteria: {},
            searchOptions: {}
          ) {
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
            },
            moreSchoolExperiences,
            totalSchoolExperiences
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
    const searchSchoolExperiencesResponse = {
      schoolExperiences: httpResponse.data.data.searchSchoolExperiences.schoolExperiences
        .map((schoolExperience: SchoolExperienceInterface) => new SchoolExperience(schoolExperience)),
      moreSchoolExperiences: httpResponse.data.data.searchSchoolExperiences.moreSchoolExperiences,
      totalSchoolExperiences: httpResponse.data.data.searchSchoolExperiences.totalSchoolExperiences
    };
    console.log('searchSchoolExperiencesResponse=', searchSchoolExperiencesResponse)
    // return explicitly for end user to handle
    return searchSchoolExperiencesResponse;
  } catch (err) {
    console.log(`err.message`, err.message);
    console.log(`err`, err);
    throw err;
  }
}