import React from 'react';
import styles from './Navbar.module.scss';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from '@reach/router';

export default function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link to='/'>INVOICES APP</Link>
      </li>
      <li>
        <PersonIcon fontSize='large' />
      </li>
      <li>Logout</li>
    </ul>
  );
}
