import * as api from 'api/clients';
import Layout from 'components/Layout/Layout';
import TotalPriceToolBar from 'components/TotalPriceToolBar/TotalPriceToolBar';
import { PaymentType } from 'data/paymentTypes';
import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { getProductState } from 'selectors/products';
import { InitialState } from 'store';
import { searchAll } from 'store/actions/productsActions';
import { ProductState } from 'store/reducers/productsReducer';
import InvoiceDetailsForm from './InvoiceDetailsForm';
import { initialState, reducer } from './invoiceDetailsReducer';

interface Props {
  searchAll: ({ url: string }) => void;
  productState: ProductState;
  onSubmitInvoice: (products, settings) => void;
}

const InvoiceDetailsFormContainer = ({
  searchAll,
  productState,
  onSubmitInvoice,
}: Props) => {
  const [localState, localDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    searchAll({ url: 'http://localhost:3000/api/products?page=1&limit=1000' });
  }, []);

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

  const saveInvoice = () => {
    onSubmitInvoice(localState.products, localState.settings);
  };

  return (
    <div>
      <Layout
        main={
          <React.Fragment>
            <InvoiceDetailsForm
              saveInvoice={saveInvoice}
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
