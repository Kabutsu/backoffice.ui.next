import { ApiResponse } from '~/server/types';

import { getClient } from '~/apollo/server';
import { gql } from '@apollo/client';

const query = gql`
  query FetchAllSuppliers {
    supplier {
      id
      name
    }
  }
`;

import Table, { Column } from '~/app/(pages)/_components/table';

import { Supplier } from '../page';
import RenderCell from './render-cell';

export default async function ProvidersTable() {
  const { data: { data: { supplier } } } = await getClient().query<ApiResponse<'supplier', Array<Supplier>>>({ query });

  const columns: Array<Column<Supplier>> = [{
    key: 'id',
    title: 'ID',
  }, {
    key: 'name',
    title: 'Name',
  }];

  return (
    <Table
      data={supplier}
      columns={columns}
      renderCell={RenderCell}
    />
  )
};
