import React from 'react';
import styles from './ClientDetailInfo.module.scss';
import { Client } from 'api/responses/clients.type';
import { ErrorTypes } from 'pages/ClientInfo/ClientInfo';

interface Props {
  clientInfo: Client;
  clientErr: string | null;
}
export default function ClientDetailInfo({ clientInfo, clientErr }: Props) {
  console.log('insie client info');
  if (clientErr === ErrorTypes.CLIENT_LOAD) {
    return <p>There was an error loading client data</p>;
  }
  console.log('clientErr is', clientErr);
  return (
    <div className={styles.wrapper}>
      <h2>Client Info</h2>
      <div className={styles.details}>
        <p data-testid='name'>
          <span>Name</span>: {clientInfo.name || '---'}
        </p>
        <p>
          <span>Company</span>: {clientInfo.shopName || '---'}
        </p>
        <p data-testid='address'>
          <span>Address</span>: {clientInfo.address || '---'}
        </p>
        <p data-testid='city'>
          <span>City</span>: {clientInfo.city || '---'}
        </p>
        <p>
          <span>Post Code</span>: {clientInfo.postcode || '---'}
        </p>
        <p>
          <span>Document</span>: {clientInfo.documentType}{' '}
          {clientInfo.documentNum || '---'}
        </p>
        <p>
          <span>Telephone 2</span>: {clientInfo.telephone1 || '---'}
        </p>
        <p>
          <span>Telephone 2</span>: {clientInfo.telephone2 || '---'}
        </p>
        <p>
          <span>Email</span>: {clientInfo.email || '---'}
        </p>
      </div>
    </div>
  );
}
