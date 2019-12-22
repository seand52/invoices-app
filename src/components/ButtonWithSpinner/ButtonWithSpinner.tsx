import React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './ButtonWithSpinner.module.scss';

interface Props {
  loading: boolean;
  type: 'submit' | 'button';
  success: boolean;
  text: string;
  onClick?: () => void;
}
export default function ButtonWithSpinner({
  loading,
  type,
  success,
  text,
  onClick,
}: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Button
          onClick={onClick}
          variant='contained'
          type={type}
          className={success ? styles.buttonSuccess : styles.button}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={24}
              style={{ color: 'white' }}
              className={styles.buttonProgress}
            />
          ) : (
            text
          )}
        </Button>
      </div>
    </div>
  );
}
