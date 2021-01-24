// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";

// models
import { Certification, CertificationInterface } from "../../models/resume";

const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface PutCertificationsRequestInterface {
  jwt: string;
  certifications: CertificationInterface[];
}

export interface PutCertificationsResponseInterface {
  certifications: Certification[];
}

export async function putCertifications(putCertificationsRequest: PutCertificationsRequestInterface): Promise<PutCertificationsResponseInterface> {
  try {
    // deconstruct for ease
    const {
      jwt,
      certifications
    } = putCertificationsRequest;

    // create and validate work experiences
    const newCertifications = certifications.map((certification) => {
      return new Certification(certification)
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
        query: `mutation putCertifications($data: PutCertificationsInputType!) {
          putCertifications(data: $data) {
            certifications {
              certificationId,
              startDate,
              endDate,
              institution,
              name
            }
          }
        }`,
        variables: {
          data: {
            certifications: newCertifications.map((item: any) =>
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
    const putCertificationsResponse = {
      certifications: httpResponse.data.data.putCertifications.certifications
        .map((certification: CertificationInterface) => new Certification(certification)),
      moreCertifications: httpResponse.data.data.putCertifications.moreCertifications,
      totalCertifications: httpResponse.data.data.putCertifications.totalCertifications
    };

    // return explicitly for end user to handle
    return putCertificationsResponse;
  } catch (err) {
    console.log('err', err)
    // throw error explicitly for user to handle
    throw err;
  }
}
