'use server';

import { getClient } from '~/apollo/server';

import query, { Samples } from '../_queries/samples';

export async function getSamples(skip: number, take: number) {
  const { error, data : { samples } } = await getClient().query<Samples>({
    query,
    variables: { skip, take }
  });

  if (error) {
    console.error('Error fetching samples:', error.message);
    throw new Error(error.message);
  }

  return samples;
};
