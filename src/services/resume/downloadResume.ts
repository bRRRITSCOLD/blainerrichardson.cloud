// libraries
import { httpClient } from "../../lib/http";
import { _ } from "../../lib/utils";


const apiUrl = `http://127.0.0.1:3000/graphql`;


export interface DownloadResumeResponseInterface {
  bytes: string;
}

export async function downloadResume(): Promise<DownloadResumeResponseInterface> {
  try {

    // build http request and call api
    const httpRequest = {
      method: 'POST',
      url: apiUrl,
      headers: { 'content-type': 'application/json' },
      data: {
        query: `{
          downloadResume {
            bytes
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
    console.log('httpResponse', httpResponse.data.data);

    // build and return response explicitly
    const downloadResumeResponse = {
      bytes: httpResponse.data.data.downloadResume.bytes,
    };
    console.log('downloadResumeResponse=', downloadResumeResponse);

    // return explicitly for end user to handle
    return downloadResumeResponse;
  } catch (err) {
    console.log(`err.message`, err.message);
    console.log(`err`, err);

    // throw error explicitly for user to handle
    throw err;
  }
}