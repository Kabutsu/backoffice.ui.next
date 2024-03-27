import { Suspense } from 'react';

import Loader from '~/app/_components/loader';
import ProvidersTable from './_components/providers-table';

export const revalidate = 5;

export type Supplier = {
  id: number;
  name: string;
};

export default function Providers() {
  return (
    <div className="flex flex-col gap-12 p-10 w-full">
      <h1 className="text-2xl font-bold">Sample Providers</h1>
      <Suspense fallback={<Loader />}>
        <ProvidersTable />
      </Suspense>
    </div>
  )
};
