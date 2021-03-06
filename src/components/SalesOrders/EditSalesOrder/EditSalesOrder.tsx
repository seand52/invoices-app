import React, { useEffect } from 'react';
import InvoiceDetailsFormContainer from 'components/Invoices/InvoiceDetailsForm/InvoiceDetailsFormContainer';
import { validateInvoice } from 'helpers/validateInvoice';
import {
  InvoiceProducts,
  InvoiceSettings,
} from 'store/reducers/invoiceFormReducer';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { prepareInvoiceData } from 'helpers/prepareInvoiceData';
import { ICreateSalesOrder } from 'forms/formValidations/add-sales-oder';
import {
  resetSuccess,
  searchOne,
  updateSalesOrder,
} from 'store/actions/SalesOrderActions';
import { connect } from 'react-redux';
import { InitialState } from 'store';
import { getSalesOrderState } from 'selectors/salesOrders';
import { SalesOrderState } from 'store/reducers/salesOrdersReducer';
import { clearInvoice } from 'store/actions/invoiceFormActions';
import { navigate } from '@reach/router';
import { makeDownloadLink } from 'helpers/makeDownloadLink';

interface Props {
  updateSalesOrder: (data: ICreateSalesOrder, id) => void;
  salesOrderId: string;
  salesOrderState: SalesOrderState;
  resetSuccess: () => void;
  clearInvoice: () => void;
  searchOne: (id: string) => void;
  dispatch: any;
}
const EditSalesOrder = ({
  updateSalesOrder,
  salesOrderState,
  resetSuccess,
  clearInvoice,
  salesOrderId,
  searchOne,
  dispatch,
}: Props) => {
  useEffect(() => {
    if (salesOrderState.success) {
      makeDownloadLink(salesOrderState.base64SalesOrder);
      resetSuccess();
      Swal.fire(
        alertProp({
          text: 'Your invoice has been saved correctly',
          title: 'Success!',
          type: 'success',
        }),
      ).then(() => {
        navigate('/sales-orders');
      });
    }
  }, [salesOrderState.success]);

  useEffect(() => {
    searchOne(salesOrderId);
    return () => {
      clearInvoice();
    };
  }, []);

  const onSubmitSalesOrder = (
    products: InvoiceProducts[],
    settings: InvoiceSettings,
  ) => {
    const res = validateInvoice(products, settings);
    if (res.type === 'error') {
      Swal.fire(
        alertProp({
          text: res.message,
          title: 'Oops...',
          type: 'error',
        }),
      );
      return;
    }
    const data = prepareInvoiceData(products, settings);
    updateSalesOrder(data, salesOrderId);
  };
  if (salesOrderState.loading) {
    return <p>Loading...</p>;
  }
  return (
    <InvoiceDetailsFormContainer
      invoiceLoading={salesOrderState.loading}
      dispatch={dispatch}
      onSubmitInvoice={onSubmitSalesOrder}
    />
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    salesOrderState: getSalesOrderState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSalesOrder: (data: ICreateSalesOrder, id) =>
      dispatch(updateSalesOrder(data, id)),
    resetSuccess: () => dispatch(resetSuccess()),
    clearInvoice: () => dispatch(clearInvoice()),
    searchOne: id => dispatch(searchOne(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSalesOrder);
