import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import Layout from 'components/Layout/Layout';
import {
  searchAll,
  deleteProduct,
  resetSuccess,
} from 'store/actions/productsActions';
import { InitialState } from 'store';
import { getProductState } from 'selectors/products';
import { ProductState } from 'store/reducers/productsReducer';
import Overview from 'components/Overview/Overview';
import SimpleModal from 'components/SimpleModal/SimpleModal';
import ProductDetailsForm from './ProductsDetailsForm/ProductDetailsForm';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';
import { initialState, reducer } from './localReducer';

interface Props {
  path: string;
  searchAll: ({ url: string }) => void;
  deleteProduct: (id: string) => void;
  resetSuccess: () => void;
  productState: ProductState;
}

interface Data {
  id: string;
  description: string;
  price: string;
  stock: string;
  actions: 'actions';
}

export interface ProductsHeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: ProductsHeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: true,
    label: 'Description',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: true,
    label: 'Price',
  },

  {
    id: 'stock',
    numeric: false,
    disablePadding: true,
    label: 'Stock',
  },

  { id: 'actions', numeric: false, disablePadding: true, label: '' },
];

const Clients = ({
  path,
  searchAll,
  productState,
  resetSuccess,
  deleteProduct: deleteProductAction,
}: Props) => {
  const [search, setSearch] = useState('');
  const [localState, localDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    searchAll({ url: 'http://localhost:3000/api/products?page=1&limit=10' });
  }, []);

  useEffect(() => {
    if (productState.success) {
      localDispatch({ type: 'CLOSE_MODAL' });
      Swal.fire(
        alertProp({
          type: 'success',
          title: 'Success!',
          text: `Product ${localState.action} correctly`,
        }),
      );
      resetSuccess();
    }
  }, [productState.success]);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
    if (search !== '') {
      searchAll({
        url: `http://localhost:3000/api/products?page=1&limit=10&name=${search}`,
      });
    } else {
      searchAll({
        url: `http://localhost:3000/api/products?page=1&limit=10`,
      });
    }
  };

  const onSearchClear = () => {
    setSearch('');
    searchAll({
      url: `http://localhost:3000/api/products?page=1&limit=10`,
    });
  };

  const addNewProduct = e => {
    e.preventDefault();
    localDispatch({ type: 'ADD_PRODUCT' });
  };

  const deleteProduct = (ids: string[]) => {
    deleteProductAction(ids[0]);
    localDispatch({ type: 'DELETE_PRODUCT' });
  };

  const editProduct = (id: string) => {
    localDispatch({ type: 'EDIT_PRODUCT', payload: id });
  };

  const onNextPage = newPage => {
    searchAll({
      url: `http://localhost:3000/api/products?page=${newPage}&limit=${productState.products.itemCount}`,
    });
  };

  const onChangeRowsPerPage = rowsPerPage => {
    searchAll({
      url: `http://localhost:3000/api/products?page=${productState.products.currentPage}&limit=${rowsPerPage}`,
    });
  };

  return (
    <div>
      <Layout
        main={
          <Overview
            onSearchClear={onSearchClear}
            loading={productState.loading}
            editItem={editProduct}
            deleteItem={deleteProduct}
            tableHeader={headCells}
            tableData={productState.products}
            onAddNew={addNewProduct}
            onSearchChange={onSearchChange}
            onSubmitSearch={submitSearch}
            onNextPage={onNextPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        }
      />
      <SimpleModal
        open={localState.showModal}
        closeModal={() => localDispatch({ type: 'TOGGLE_MODAL' })}
      >
        <ProductDetailsForm selectedProduct={localState.selectedProductId} />
      </SimpleModal>
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
    deleteProduct: id => dispatch(deleteProduct(id)),
    resetSuccess: () => dispatch(resetSuccess()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Clients);
