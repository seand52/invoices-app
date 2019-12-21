import React from 'react';
import styles from './Layout.module.scss';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { navigate } from '@reach/router';
import Navbar from 'components/Navbar/Navbar';
import { logout } from 'store/actions/userActions';
import { connect } from 'react-redux';

interface Props {
  main?: JSX.Element;
  logout: () => void;
}
const Layout = ({ main, logout }: Props) => {
  const userLogout = e => {
    e.preventDefault();
    logout();
  };
  return (
    <div className={styles.app_layout}>
      <div className={styles.navbar}>
        <Navbar userLogout={userLogout} />
      </div>
      <div className={styles.sidebar_left}>
        <List style={{ paddingTop: 0 }} component='nav'>
          <ListItem onClick={() => navigate('/clients')} button>
            <ListItemText primary='Clients' />
          </ListItem>
          <ListItem onClick={() => navigate('/products')} button>
            <ListItemText primary='Products' />
          </ListItem>
          <ListItem onClick={() => navigate('/invoices')} button>
            <ListItemText primary='Invoices' />
          </ListItem>
          <ListItem onClick={() => navigate('/sales-orders')} button>
            <ListItemText primary='Sales Orders' />
          </ListItem>
        </List>
      </div>
      <div className={styles.sidebar_right}>{main}</div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Layout);
