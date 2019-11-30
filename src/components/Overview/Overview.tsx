import React from 'react';
import OverviewHeader from './OverviewHeader/OverviewHeader';
import OverviewTable from './OverviewTable/OverviewTable';
import { ClientsPaginated } from 'api/responses/clients.type';

interface Props {
  onSearchChange: (e) => void;
  onSubmitSearch: (e) => void;
  onAddNew: (e) => void;
  tableData: ClientsPaginated;
  clientsTableHeader: string[];
}
export default function Overview({
  onSearchChange,
  onSubmitSearch,
  onAddNew,
  tableData,
  clientsTableHeader,
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
          clientsTableHeader={clientsTableHeader}
          tableData={tableData}
        />
      ) : null}
    </div>
  );
}
