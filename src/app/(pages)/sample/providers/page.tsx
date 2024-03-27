import { Suspense } from 'react';

import Loader from '~/app/_components/loader';
import H1 from '~/app/_components/h1';
import ProvidersTable from '~/app/(pages)/sample/providers/_components/providers-table';

export const revalidate = 5;

export type Supplier = {
  id: number;
  name: string;
};

export default function Providers() {
  return (
    <>
      <H1>Sample Providers</H1>
      <Suspense fallback={<Loader />}>
        <ProvidersTable />
      </Suspense>
    </>
  )
};
