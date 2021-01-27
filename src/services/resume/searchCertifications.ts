// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

// models
import { Certification, CertificationInterface } from "../../models/resume";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface SearchCertificationsResponseInterface {
  certifications: Certification[];
  moreCertifications: boolean;
  totalCertifications: number;
}

export async function searchCertifications(): Promise<SearchCertificationsResponseInterface> {
  try {

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: { 'content-type': 'application/json' },
      data: {
        query: `{
          searchCertifications(
            searchCriteria: {},
            searchOptions: {}
          ) {
            certifications {
              certificationId,
              startDate,
              endDate,
              institution,
              name
            },
            moreCertifications,
            totalCertifications
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
    const searchCertificationsResponse = {
      certifications: httpResponse.data.data.searchCertifications.certifications
        .map((certification: CertificationInterface) => new Certification(certification)),
      moreCertifications: httpResponse.data.data.searchCertifications.moreCertifications,
      totalCertifications: httpResponse.data.data.searchCertifications.totalCertifications
    };
    console.log('searchCertificationsResponse=', searchCertificationsResponse)
    // return explicitly for end user to handle
    return searchCertificationsResponse;
  } catch (err) {
    console.log(`err.message`, err.message);
    console.log(`err`, err);
    throw err;
  }
}