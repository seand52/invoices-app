import React from 'react';
import { Router } from '@reach/router';
import 'App.scss';
import LoginContainer from 'components/Login/LoginContainer';
import RegisterContainer from 'components/Register/RegisterContainer';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <LoginContainer path='/' />
        <LoginContainer path='/login' />
        <RegisterContainer path='/register' />
      </Router>
    </div>
  );
};

export default App;
