import React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './ButtonWithSpinner.module.scss';

interface Props {
  loading: boolean;
  type: 'submit';
  success: boolean;
  text: string;
}
export default function ButtonWithSpinner({
  loading,
  type,
  success,
  text,
}: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Button
          variant='contained'
          color='primary'
          type={type}
          className={success ? styles.buttonSuccess : styles.button}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} className={styles.buttonProgress} />
          ) : (
            text
          )}
        </Button>
      </div>
    </div>
  );
}
