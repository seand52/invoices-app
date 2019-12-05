import React, { useReducer, useEffect } from 'react';
import * as api from 'api/clients';
import Layout from 'components/Layout/Layout';
import { PaymentType } from 'data/paymentTypes';
import InvoiceDetailsForm from './InvoiceDetailsForm';
import {
  initialState,
  reducer,
  InvoiceSettings,
  InvoiceProducts,
} from './invoiceDetailsReducer';
import { searchAll } from 'store/actions/productsActions';
import { connect } from 'react-redux';
import { getProductState } from 'selectors/products';
import { InitialState } from 'store';
import { ProductState } from 'store/reducers/productsReducer';
import TotalPriceToolBar from 'components/TotalPriceToolBar/TotalPriceToolBar';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { ICreateInvoice } from 'forms/formValidations/add-invoice';
import { newInvoice, resetSuccess } from 'store/actions/invoiceActions';
import { getInvoiceState } from 'selectors/invoices';
import { InvoiceState } from 'store/reducers/invoicesReducer';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  productState: ProductState;
  invoiceState: InvoiceState;
  saveInvoice: (data: ICreateInvoice) => void;
  resetSuccess: () => void;
}

const validateInvoice = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
) => {
  if (!settings.clientId || !settings.paymentType) {
    return {
      type: 'error',
      message:
        'You must complete the required fields before saving your invoice. Check that you have selected a client and payment type',
    };
  }
  const filteredProducts = products.filter(item => item.id !== null);
  if (!filteredProducts.length) {
    return {
      type: 'error',
      message: 'You cannot create an invoice without any products!',
    };
  }
  return {
    message: 'ok',
    type: 'success',
  };
};

const prepareInvoiceData = (
  products: InvoiceProducts[],
  settings: InvoiceSettings,
) => {
  return {
    settings,
    products: products.map(item => ({
      id: item.id,
      quantity: item.quantity,
    })),
  };
};

const InvoiceDetailsFormContainer = ({
  searchAll,
  productState,
  invoiceState,
  saveInvoice,
  resetSuccess,
}: Props) => {
  const [localState, localDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    searchAll({ url: 'http://localhost:3000/api/products?page=1&limit=1000' });
  }, []);

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

  const addProductRow = () => {
    localDispatch({ type: 'ADD_PRODUCT' });
  };

  const deleteProductRow = (uuid: string) => {
    localDispatch({ type: 'DELETE_PRODUCT', payload: uuid });
  };

  const onSelectProduct = (product, uuid) => {
    localDispatch({
      type: 'SELECT_PRODUCT',
      payload: {
        product: {
          id: !product ? null : product.id,
          price: !product ? 0 : product.price,
          quantity: 1,
          uuid,
        },
        uuid,
      },
    });
  };

  const onChangeProductQuantity = (newQuantity, uuid) => {
    localDispatch({
      type: 'CHANGE_QUANTITY',
      payload: {
        uuid,
        newQuantity,
      },
    });
  };

  const onSubmitInvoice = () => {
    const { products, settings } = localState;
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

  return (
    <div>
      <Layout
        main={
          <React.Fragment>
            <InvoiceDetailsForm
              onSubmitInvoice={onSubmitInvoice}
              onClientInputChange={onClientInputChange}
              onSelectTax={onSelectTax}
              clientsLoading={localState.clientLoading}
              options={localState.clientsFound}
              onSelectInvoiceSetting={onSelectInvoiceSetting}
              products={productState.products.items}
              invoiceState={localState}
              addProductRow={addProductRow}
              deleteProductRow={deleteProductRow}
              onSelectProduct={onSelectProduct}
              onChangeProductQuantity={onChangeProductQuantity}
            />
            <TotalPriceToolBar
              settings={localState.settings}
              products={localState.products}
            />
          </React.Fragment>
        }
      />
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    productState: getProductState(state),
    invoiceState: getInvoiceState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    saveInvoice: (data: ICreateInvoice) => dispatch(newInvoice(data)),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceDetailsFormContainer);
