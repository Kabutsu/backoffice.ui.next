import { getServerAuthSession } from '~/server/auth';
import { ApiResponse } from '~/server/types';

import Table, { Column } from '~/app/(pages)/_components/table';

import { Supplier } from '../page';
import RenderCell from './render-cell';

export default async function ProvidersTable() {
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
    console.log('Response:', response);
    let data = (await response.json());
    console.log('Data:', data);
    data = data as ApiResponse<'supplier', Array<Supplier>>;
    console.log('Suppliers:', data.data.supplier);

    if (data.errors) {
      console.error(data.errors);
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
    <Table
      data={data}
      columns={columns}
      renderCell={RenderCell}
    />
  )
};
