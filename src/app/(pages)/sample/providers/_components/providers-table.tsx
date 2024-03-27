import { getClient } from '~/apollo/server';

import Table, { Column } from '~/app/(pages)/_components/table';

import { Supplier } from '../page';
import query, { type Suppliers } from '../_queries/suppliers';
import RenderCell from './render-cell';

export default async function ProvidersTable() {
  const { data: { supplier } } = await getClient().query<Suppliers>({ query });

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
