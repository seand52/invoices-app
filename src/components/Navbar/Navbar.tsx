import React from 'react';
import styles from './Navbar.module.scss';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from '@reach/router';

interface Props {
  userLogout: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
}
export default function Navbar({ userLogout }: Props) {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link to='/clients'>INVOICES APP</Link>
      </li>
      <li>
        <PersonIcon fontSize='large' />
      </li>
      <li>
        <a href='#' onClick={userLogout}>
          Logout
        </a>{' '}
      </li>
    </ul>
  );
}
