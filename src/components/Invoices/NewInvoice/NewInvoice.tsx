import React, { useEffect } from 'react';
import InvoiceDetailsFormContainer from '../InvoiceDetailsForm/InvoiceDetailsFormContainer';
import { validateInvoice } from 'helpers/validateInvoice';
import {
  InvoiceProducts,
  InvoiceSettings,
} from '../InvoiceDetailsForm/invoiceDetailsReducer';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { prepareInvoiceData } from 'helpers/prepareInvoiceData';
import { ICreateInvoice } from 'forms/formValidations/add-invoice';
import { newInvoice, resetSuccess } from 'store/actions/invoiceActions';
import { connect } from 'react-redux';
import { InitialState } from 'store';
import { getInvoiceState } from 'selectors/invoices';
import { InvoiceState } from 'store/reducers/invoicesReducer';

interface Props {
  saveInvoice: (data: ICreateInvoice) => void;
  invoiceState: InvoiceState;
  resetSuccess: () => void;
}
const NewInvoice = ({ saveInvoice, invoiceState, resetSuccess }: Props) => {
  useEffect(() => {
    if (invoiceState.success) {
      resetSuccess();
      Swal.fire(
        alertProp({
          text: 'Your invoice has been saved correctly',
          title: 'Success!',
          type: 'success',
        }),
      );
    }
  }, [invoiceState.success]);

  const onSubmitInvoice = (
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
    saveInvoice(data);
  };
  return <InvoiceDetailsFormContainer onSubmitInvoice={onSubmitInvoice} />;
};

const mapStateToProps = (state: InitialState) => {
  return {
    invoiceState: getInvoiceState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveInvoice: (data: ICreateInvoice) => dispatch(newInvoice(data)),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);