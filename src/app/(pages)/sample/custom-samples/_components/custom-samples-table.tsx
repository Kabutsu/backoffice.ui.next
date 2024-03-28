'use client';

import { useState } from 'react';

import Table, { Column } from '~/app/(pages)/_components/table';

import { Sample } from '../page';
import RenderCell from './render-cell';

import { getSamples } from '../_actions';
import Loader from '~/app/_components/loader';
import { useQuery } from '@tanstack/react-query';

const columns: Array<Column<Sample>> = [{
  key: 'id',
  title: 'ID',
}, {
  key: 'countryCultureLanguageId',
  title: 'Culture',
}, {
  key: 'owningWorkspace',
  title: 'Workspace',
}, {
  key: 'name',
  title: 'Name',
}, {
  key: 'numberOfRespondents',
  title: 'Base',
}, {
  key: 'actualIr',
  title: 'Actual IR',
}, {
  key: 'lastUsedDate',
  title: 'Last Used Date',
}, {
  key: 'author',
  title: 'Created By',
}];

const PAGE_SIZE = 10;

export default function CustomSampleTable() {
  const [currentPage] = useState(0);
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['samples', currentPage],
    queryFn: () => getSamples(currentPage * PAGE_SIZE, PAGE_SIZE),
  });

  if (isError) {
    throw new Error('Failed to load samples', { cause: error });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table
      data={data?.items || []}
      columns={columns}
      renderCell={RenderCell}
    />
  )
};
