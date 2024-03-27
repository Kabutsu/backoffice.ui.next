import { Suspense } from 'react';

import { getServerAuthSession } from '~/server/auth';
import { ApiResponse } from '~/server/types';

import Loader from '~/app/_components/loader';
import Table, { Column } from '~/app/(pages)/_components/table';
import RenderCell from './render-cell';

export type Supplier = {
  id: number;
  name: string;
};

export default async function Providers() {
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error('You need to be authenticated to view this page');
  }

  async function getProviders() {
    const body = {
      query: `
        query FetchAllSuppliers {
          supplier {
            id
            name
          }
        }
      `
    };
    
    if (!session?.accessToken) {
      throw new Error('No accessToken found in session');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    };
    const requestObj = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };

    const response = await fetch(process.env.BFF_API_URL as string, requestObj);
    const data = (await response.json()) as ApiResponse<'supplier', Array<Supplier>>;

    if (data.errors) {
      console.error(data.errors[0].extensions);
    }

    return data.data.supplier;
  };

  const data = await getProviders();

  const columns: Array<Column<Supplier>> = [{
    key: 'id',
    title: 'ID',
  }, {
    key: 'name',
    title: 'Name',
  }];

  return (
    <div className="flex flex-col gap-12 p-10 w-full">
      <h1 className="text-2xl font-bold">Sample Providers</h1>
      <Suspense fallback={<Loader />}>
        <Table
          data={data}
          columns={columns}
          renderCell={RenderCell}
        />
      </Suspense>
    </div>
  )
};
