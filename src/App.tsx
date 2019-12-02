import React from 'react';
import { Router } from '@reach/router';
import 'App.scss';
import LoginContainer from 'components/Login/LoginContainer';
import RegisterContainer from 'components/Register/RegisterContainer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import Clients from 'components/Clients/Clients';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import Products from 'components/Products/Products';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <PublicRoute component={LoginContainer} path='/' />
        <PublicRoute component={LoginContainer} path='/login' />
        <PublicRoute component={RegisterContainer} path='/register' />
        {/* <LoginContainer path='/' />
        <LoginContainer path='/login' />
        <RegisterContainer path='/register' /> */}
        <PrivateRoute path='/clients' component={Clients} />
        <PrivateRoute path='/products' component={Products} />
      </Router>
    </div>
  );
};

export default App;
