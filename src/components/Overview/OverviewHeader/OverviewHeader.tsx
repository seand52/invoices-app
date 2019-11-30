import React from 'react';
import styles from './OverviewHeader.module.scss';
import { TextField } from '@material-ui/core';

interface Props {
  title: string;
  onSearchChange: (e: any) => void;
  onSubmitSearch: (e) => void;
  onAddNew: (e) => void;
}
export default function OverviewHeader({
  title,
  onSearchChange,
  onSubmitSearch,
  onAddNew,
}: Props) {
  return (
    <div className={styles.overview_header}>
      <ul className={styles.list}>
        <li className={styles.search}>
          <form onSubmit={onSubmitSearch}>
            <TextField
              onChange={onSearchChange}
              id='standard-required'
              label='Search'
              className={styles.textField}
              margin='normal'
            />
          </form>
        </li>
        <li className={styles.add_new}>
          <a href='#new' onClick={onAddNew}>
            Add
          </a>
        </li>
      </ul>
    </div>
  );
}
