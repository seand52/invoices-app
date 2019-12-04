import * as api from 'api/clients';
import Layout from 'components/Layout/Layout';
import { PaymentType } from 'data/paymentTypes';
import { taxOptions } from 'data/taxOptions';
import React, { useReducer } from 'react';
import InvoiceDetailsForm from './InvoiceDetailsForm';
import { initialState, reducer } from './invoiceDetailsReducer';

interface Props {
  path: string;
}
export default function InvoiceDetailsFormContainer({}: Props) {
  const [localState, localDispatch] = useReducer(reducer, initialState);

  const onClientInputChange = async e => {
    const { value } = e.target;
    if (value.trim().length === 0) {
      localDispatch({ type: 'FIND_CLIENTS_OK', payload: [] });
    }
    if (value.trim().length % 2 === 0 && value.trim().length >= 3) {
      localDispatch({ type: 'FIND_CLIENTS' });
      const response = await api.searchClientsByName(value);
      localDispatch({ type: 'FIND_CLIENTS_OK', payload: response });
    }
  };

  const onSelectTax = (e, newValue) => {
    const tax = newValue.filter(item => item.category === 'tax');
    const re = newValue.filter(item => item.category === 're');

    if (tax.length > 1 || re.length > 1) {
      newValue.pop();
      return;
    }

    localDispatch({ type: 'UPDATE_TAXES', payload: newValue });
  };

  const onSelectInvoiceSetting = (field, newValue: PaymentType) => {
    localDispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        field: field,
        value: newValue,
      },
    });
  };

  return (
    <div>
      <Layout
        main={
          <InvoiceDetailsForm
            onClientInputChange={onClientInputChange}
            onSelectTax={onSelectTax}
            clientsLoading={localState.clientLoading}
            options={localState.clientsFound}
            onSelectInvoiceSetting={onSelectInvoiceSetting}
          />
        }
      />
    </div>
  );
}
