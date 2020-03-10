import React from 'react';
import styles from './ClientDetailInfo.module.scss';

export default function ClientDetailInfo() {
  return (
    <div className={styles.wrapper}>
      <h2>Client Info</h2>
      <div className={styles.details}>
        <p>
          <span>Name</span>: Sean Daryanani
        </p>
        <p>
          <span>Company</span>: The Company
        </p>
        <p>
          <span>Address</span>: The Address
        </p>
        <p>
          <span>City</span>: The City
        </p>
        <p>
          <span>Post</span> Code: 08015
        </p>
        <p>
          <span>Document</span>: 47919191
        </p>
        <p>
          <span>Telephone</span> 1: 47919191
        </p>
        <p>
          <span>Telephone</span> 2: 47919191
        </p>
        <p>
          <span>Email</span>: 47919191
        </p>
      </div>
    </div>
  );
}
