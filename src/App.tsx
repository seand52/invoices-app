import React from 'react';
import { Router } from '@reach/router';
import 'App.scss';
import Login from 'components/Login';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Login path='/' />
        <Login path='/login' />
      </Router>
    </div>
  );
};

export default App;
