'use client';

import { useEffect, useState } from 'react';

import Table, { Column } from '~/app/(pages)/_components/table';

import { Sample } from '../page';
import RenderCell from './render-cell';

import { getSamples } from '../_actions';
import Loader from '~/app/_components/loader';

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
  const [isLoading, setIsLoading] = useState(true);
  const [samples, setSamples] = useState<Array<Sample>>([]);

  const loadSamples = async () => {
    const samples = await getSamples(currentPage * PAGE_SIZE, PAGE_SIZE);
    setSamples(samples.items);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    void loadSamples();
  }, [currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table
      data={samples}
      columns={columns}
      renderCell={RenderCell}
    />
  )
};
