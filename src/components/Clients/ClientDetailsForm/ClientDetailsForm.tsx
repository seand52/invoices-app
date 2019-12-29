import React from 'react';
import useFormBuilder from 'hooks/useFormBuilder';
import { ICreateClient } from 'forms/formValidations/add-client';
import styles from './ClientDetailsForm.module.scss';
import { TextField } from '@material-ui/core';
import { Link } from '@reach/router';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import { newClient, updateClient } from 'store/actions/clientActions';
import { connect } from 'react-redux';
import { getClientsState } from 'selectors/clients';
import { ClientState } from 'store/reducers/clientsReducer';

interface Props {
  createClient: (data: ICreateClient) => void;
  updateClient: (data: ICreateClient, id: string) => void;
  clientState: ClientState;
  selectedClient: null | string;
}
const ClientDetailsForm = ({
  createClient,
  updateClient,
  clientState,
  selectedClient,
}: Props) => {
  const clients = clientState.clients.items;
  const client = clients.find(item => item.id.toString() === selectedClient);
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'createClientFields',
  });

  const onSubmit = (data: ICreateClient) => {
    if (!client) {
      createClient(data);
    } else {
      updateClient(data, client.id.toString());
    }
  };
  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
      <h1>Please fill in the clients details</h1>
      <div className={styles.form_items}>
        <TextField
          defaultValue={client && client.name}
          error={errors['name'] ? true : false}
          helperText={errors['name'] ? errors['name'].message : null}
          inputRef={register}
          name='name'
          label='Name*'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.shopName}
          inputRef={register}
          error={errors['shopName'] ? true : false}
          helperText={errors['shopName'] ? errors['shopName'].message : null}
          name='shopName'
          label='Shop Name'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.address}
          inputRef={register}
          error={errors['address'] ? true : false}
          helperText={errors['address'] ? errors['address'].message : null}
          name='address'
          label='Address*'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.city}
          inputRef={register}
          error={errors['city'] ? true : false}
          helperText={errors['city'] ? errors['city'].message : null}
          name='city'
          label='City*'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.province}
          inputRef={register}
          error={errors['province'] ? true : false}
          helperText={errors['province'] ? errors['province'].message : null}
          name='province'
          label='Province'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.postcode}
          inputRef={register}
          error={errors['postcode'] ? true : false}
          helperText={errors['postcode'] ? errors['postcode'].message : null}
          name='postcode'
          label='Post code*'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.numCif}
          inputRef={register}
          error={errors['numCif'] ? true : false}
          helperText={errors['numCif'] ? errors['numCif'].message : null}
          name='numCif'
          label='CIF'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.numNif}
          inputRef={register}
          error={errors['numNif'] ? true : false}
          helperText={errors['numNif'] ? errors['numNif'].message : null}
          name='numNif'
          label='NIF'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.telephone1}
          inputRef={register}
          error={errors['telephone1'] ? true : false}
          helperText={
            errors['telephone1'] ? errors['telephone1'].message : null
          }
          name='telephone1'
          label='Telephone 1'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.telephone2}
          inputRef={register}
          error={errors['telephone2'] ? true : false}
          helperText={
            errors['telephone2'] ? errors['telephone2'].message : null
          }
          name='telephone2'
          label='Telephone 2'
          margin='normal'
          variant='outlined'
        />
        <TextField
          defaultValue={client && client.email}
          inputRef={register}
          error={errors['email'] ? true : false}
          helperText={errors['email'] ? errors['email'].message : null}
          name='email'
          label='Email'
          margin='normal'
          variant='outlined'
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <ButtonWithSpinner
          loading={clientState.formLoading}
          success={clientState.success}
          type='submit'
          text='Submit Details'
        />
      </div>
      {clientState.formError && (
        <ErrorMessage>{clientState.formError}</ErrorMessage>
      )}
    </form>
  );
};

const mapStateToProps = (state: any) => {
  return {
    clientState: getClientsState(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createClient: (data: ICreateClient) => dispatch(newClient(data)),
    updateClient: (data: ICreateClient, id: string) =>
      dispatch(updateClient(data, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailsForm);
