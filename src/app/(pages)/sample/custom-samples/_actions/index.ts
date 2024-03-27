'use server';

import { getClient } from '~/apollo/server';

import query, { Samples } from '../_queries/samples';

export async function getSamples(skip: number, take: number) {
  const { loading, error, data : { samples } } = await getClient().query<Samples>({
    query,
    variables: { skip, take }
  });

  return samples;
};
