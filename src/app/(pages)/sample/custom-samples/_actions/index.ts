'use server';

import { getServerAuthSession } from '~/server/auth';
import { PaginatedApiResponse } from '~/server/types';

import { Sample } from '../page';

export async function getSamples(skip: number, take: number) {
  const session = await getServerAuthSession();
  
  if (!session) {
    console.error('No session found');
    throw new Error('No session found');
  } else if (!session?.accessToken) {
    console.error('No accessToken found in session');
    throw new Error('No accessToken found in session');
  }

  const body = {
    query: `
      query PaginatedCustomSamples(
        $skip: Int!,
        $take: Int!,
      ) {
        samples: paginatedSample(
          skip: $skip,
          take: $take,
          order: { countryCultureLanguageId: ASC, name: ASC },
          where: {
            clonedFromSampleId: { eq: null },
            isDisabled: { eq: false },
          }
        ) {
          totalCount,
          items {
            id
            countryCultureLanguageId
            owningWorkspace
            name
            numberOfRespondents
            actualIr
            lastUsedDate
            author
          }
        }
      }
    `,
    variables: { skip, take },
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.accessToken}`,
  };

  const requestObj = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(process.env.BFF_API_URL as string, requestObj);

  if (response.status >= 400) {
    console.error('Failed to fetch data', response.statusText);
    throw new Error('Failed to fetch data', { cause: response.statusText });
  }

  let data = (await response.json()) as PaginatedApiResponse<'samples', Array<Sample>>;

  if (data.errors) {
    console.error('Error within data', data.errors);
    throw new Error('Error within data', { cause: data.errors });
  }

  return data.data.samples.items;
};
