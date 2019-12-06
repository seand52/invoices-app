import React from 'react';
import useFormBuilder from 'hooks/useFormBuilder';
import { TextField } from '@material-ui/core';
import { Link } from '@reach/router';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import { connect } from 'react-redux';
import { ICreateProduct } from 'forms/formValidations/add-product';
import { newProduct, updateProduct } from 'store/actions/productsActions';
import { ProductState } from 'store/reducers/productsReducer';
import { getProductState } from 'selectors/products';
import styles from './ProductDetailsForm.module.scss';

interface Props {
  createProduct: (data: ICreateProduct) => void;
  updateProduct: (data: ICreateProduct, id: string) => void;
  productState: ProductState;
  selectedProduct: null | string;
}
const ProductDetailsForm = ({
  createProduct,
  updateProduct,
  productState,
  selectedProduct,
}: Props) => {
  const products = productState.products.items;
  const product = products.find(item => item.id.toString() === selectedProduct);
  const { register, handleSubmit, errors, watch } = useFormBuilder({
    key: 'createProductsFields',
  });

  const onSubmit = (data: ICreateProduct) => {
    if (!product) {
      createProduct(data);
    } else {
      updateProduct(data, product.id.toString());
    }
  };
  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
      <h1>Please fill in the clients details</h1>
      <div className={styles.form_items}>
        <TextField
          defaultValue={product && product.description}
          error={errors['description'] ? true : false}
          helperText={
            errors['description'] ? errors['description'].message : null
          }
          inputRef={register}
          name='description'
          label='Description*'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={product && product.price}
          error={errors['price'] ? true : false}
          helperText={errors['price'] ? errors['price'].message : null}
          name='price'
          inputRef={register}
          label='Price'
          variant='outlined'
          type='text'
          className={styles.textField}
          margin='normal'
        />
      </div>
      <ButtonWithSpinner
        loading={false}
        success={true}
        type='submit'
        text='Submit Details'
      />
      {/* {apiError && <ErrorMessage>{apiError}</ErrorMessage>} */}
    </form>
  );
};

const mapStateToProps = (state: any) => {
  return {
    productState: getProductState(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createProduct: (data: ICreateProduct) => dispatch(newProduct(data)),
    updateProduct: (data: ICreateProduct, id: string) =>
      dispatch(updateProduct(data, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsForm);
