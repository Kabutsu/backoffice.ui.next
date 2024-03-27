

import { ApolloWrapper } from '~/apollo/react';
import H1 from '~/app/_components/h1';
import CustomSampleTable from './_components/custom-samples-table';
import { Suspense } from 'react';
import Loader from '~/app/_components/loader';

export type Sample = {
  id: string;
  countryCultureLanguageId: number;
  owningWorkspace: string;
  name: string;
  numberOfRespondents: number;
  actualIr: number;
  lastUsedDate: Date;
  author: string;
};

export default function CustomSamples() {
  return (
    <>
      <H1>Custom Samples</H1>
      <Suspense fallback={<Loader />}>
        <CustomSampleTable />
      </Suspense>
    </>
  )
};
