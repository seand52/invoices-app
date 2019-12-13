import * as api from 'api/clients';
import Layout from 'components/Layout/Layout';
import TotalPriceToolBar from 'components/TotalPriceToolBar/TotalPriceToolBar';
import { PaymentType } from 'data/paymentTypes';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductState } from 'selectors/products';
import { InitialState } from 'store';
import { searchAll } from 'store/actions/productsActions';
import { ProductState } from 'store/reducers/productsReducer';
import InvoiceDetailsForm from './InvoiceDetailsForm';
import { InvoiceDetailsState } from 'store/reducers/invoiceFormReducer';
import { getInvoiceFormState } from 'selectors/invoiceForm';
import { getInvoiceState } from 'selectors/invoices';
import { InvoiceState } from 'store/reducers/invoicesReducer';

interface Props {
  searchAll: ({ url: string }) => void;
  productState: ProductState;
  onSubmitInvoice: (products, settings) => void;
  invoiceFormState: InvoiceDetailsState;
  invoiceLoading: boolean;
  dispatch?: any;
}

const InvoiceDetailsFormContainer = ({
  searchAll,
  productState,
  onSubmitInvoice,
  invoiceFormState,
  invoiceLoading,
  dispatch,
}: Props) => {
  useEffect(() => {
    searchAll({ url: 'http://localhost:3000/api/products?page=1&limit=1000' });
  }, [searchAll]);

  const onClientInputChange = async e => {
    const { value } = e.target;
    if (value.trim().length === 0) {
      dispatch({ type: 'FIND_CLIENTS_OK', payload: [] });
    }
    if (value.trim().length % 2 === 0 && value.trim().length >= 3) {
      dispatch({ type: 'FIND_CLIENTS' });
      const response = await api.searchClientsByName(value);
      dispatch({ type: 'FIND_CLIENTS_OK', payload: response });
    }
  };

  const onSelectTax = (e, newValue) => {
    const tax = newValue.filter(item => item.category === 'tax');
    const re = newValue.filter(item => item.category === 're');

    if (tax.length > 1 || re.length > 1) {
      newValue.pop();
      return;
    }

    dispatch({ type: 'UPDATE_TAXES', payload: newValue });
  };

  const onSelectInvoiceSetting = (field, newValue: PaymentType) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        field: field,
        value: newValue,
      },
    });
  };

  const addProductRow = () => {
    dispatch({ type: 'ADD_PRODUCT' });
  };

  const deleteProductRow = (uuid: string) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: uuid });
  };

  const onSelectProduct = (product, uuid) => {
    if (!product) {
      dispatch({
        type: 'SELECT_PRODUCT',
        payload: {
          product: {
            price: 0,
            quantity: 0,
            uuid,
            description: '',
            discount: 0,
          },
          uuid,
        },
      });
      return;
    }
    dispatch({
      type: 'SELECT_PRODUCT',
      payload: {
        product: {
          price: !product ? 0 : product.price,
          quantity: 1,
          uuid,
          description: product.description,
          discount: 0,
        },
        uuid,
      },
    });
  };

  const onChangeProductQuantity = (newQuantity, uuid) => {
    dispatch({
      type: 'CHANGE_QUANTITY',
      payload: {
        uuid,
        newQuantity,
      },
    });
  };

  const changeDiscount = (uuid, value) => {
    dispatch({ type: 'SET_DISCOUNT', payload: { uuid, value } });
  };
  const saveInvoice = () => {
    onSubmitInvoice(invoiceFormState.products, invoiceFormState.settings);
  };

  return (
    <div>
      <Layout
        main={
          <React.Fragment>
            <InvoiceDetailsForm
              invoiceLoading={invoiceLoading}
              changeDiscount={changeDiscount}
              saveInvoice={saveInvoice}
              onClientInputChange={onClientInputChange}
              onSelectTax={onSelectTax}
              clientsLoading={invoiceFormState.clientLoading}
              options={invoiceFormState.clientsFound}
              onSelectInvoiceSetting={onSelectInvoiceSetting}
              products={productState.products.items}
              invoiceState={invoiceFormState}
              addProductRow={addProductRow}
              deleteProductRow={deleteProductRow}
              onSelectProduct={onSelectProduct}
              onChangeProductQuantity={onChangeProductQuantity}
            />
            <TotalPriceToolBar
              settings={invoiceFormState.settings}
              products={invoiceFormState.products}
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
    invoiceFormState: getInvoiceFormState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceDetailsFormContainer);
