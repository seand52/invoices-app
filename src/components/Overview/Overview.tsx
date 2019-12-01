import React from 'react';
import OverviewHeader from './OverviewHeader/OverviewHeader';
import OverviewTable from './OverviewTable/OverviewTable';
import { ClientsPaginated } from 'api/responses/clients.type';
import { HeadCell } from 'components/Clients/Clients';

interface Props {
  onSearchChange: (e) => void;
  onSubmitSearch: (e) => void;
  onAddNew: (e) => void;
  tableData: ClientsPaginated;
  tableHeader: HeadCell[];
  onNextPage: (newPage: number) => void;
  deleteItem: (ids: string[]) => void;
  editItem: (id: string) => void;
}
export default function Overview({
  onSearchChange,
  onSubmitSearch,
  onAddNew,
  tableData,
  tableHeader,
  onNextPage,
  deleteItem,
  editItem,
}: Props) {
  return (
    <div>
      {tableData && tableData.items && tableData.items.length ? (
        <OverviewHeader
          onAddNew={onAddNew}
          onSearchChange={onSearchChange}
          onSubmitSearch={onSubmitSearch}
          title='Clients'
        />
      ) : null}
      {tableData && tableData.items && tableData.items.length ? (
        <OverviewTable
          deleteItem={deleteItem}
          onNextPage={onNextPage}
          tableHeader={tableHeader}
          tableData={tableData}
          editItem={editItem}
        />
      ) : null}
    </div>
  );
}
