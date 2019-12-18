import React from 'react';
import OverviewHeader from './OverviewHeader/OverviewHeader';
import OverviewTable from './OverviewTable/OverviewTable';
import { ClientsPaginated } from 'api/responses/clients.type';
import { HeadCell } from 'components/Clients/Clients';
import { ProductsHeadCell } from 'components/Products/Products';
import { ProductsPaginated } from 'api/responses/products.type';
import { InvoicesPaginated } from 'api/responses/invoices.type';
import { InvoicesHeadCell } from 'components/Invoices/Invoices';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

export type TableOptions =
  | ClientsPaginated
  | ProductsPaginated
  | InvoicesPaginated;

export type TableHeadOptions =
  | HeadCell[]
  | ProductsHeadCell[]
  | InvoicesHeadCell[];

interface Props<T extends TableOptions, P extends TableHeadOptions> {
  searchState?: string;
  onSearchChange: (e) => void;
  onSubmitSearch: (e) => void;
  onAddNew: (e) => void;
  tableData: T;
  tableHeader: P;
  onNextPage: (newPage: number) => void;
  deleteItem: (ids: string[]) => void;
  editItem: (id: string) => void;
  onChangeRowsPerPage: (rowsPerPage: string) => void;
  loading?: boolean;
  onSearchClear?: () => void;
  transformToInvoice?: (id) => void;
  tableActions?: { label: string; value: string }[];
  newInvoice?: (id, name) => void;
  error: string | null;
}
export default function Overview<
  T extends TableOptions,
  P extends TableHeadOptions
>({
  searchState,
  onSearchChange,
  onSubmitSearch,
  onAddNew,
  tableData,
  tableHeader,
  onNextPage,
  deleteItem,
  editItem,
  onChangeRowsPerPage,
  loading,
  onSearchClear,
  transformToInvoice,
  tableActions,
  newInvoice,
  error,
}: Props<T, P>) {
  return (
    <div>
      <OverviewHeader
        searchState={searchState}
        onSearchClear={onSearchClear}
        onAddNew={onAddNew}
        onSearchChange={onSearchChange}
        onSubmitSearch={onSubmitSearch}
        title='Clients'
      />
      {tableData &&
      tableData.items &&
      tableData.items.length &&
      !loading &&
      !error ? (
        <OverviewTable
          newInvoice={newInvoice}
          tableActions={tableActions}
          transformToInvoice={transformToInvoice}
          onChangeRowsPerPage={onChangeRowsPerPage}
          deleteItem={deleteItem}
          onNextPage={onNextPage}
          tableHeader={tableHeader}
          tableData={tableData}
          editItem={editItem}
        />
      ) : null}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </div>
  );
}
