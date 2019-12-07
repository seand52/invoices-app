import React from 'react';
import { Router } from '@reach/router';
import 'App.scss';
import LoginContainer from 'components/Login/LoginContainer';
import RegisterContainer from 'components/Register/RegisterContainer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import Clients from 'components/Clients/Clients';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import Products from 'components/Products/Products';
import Invoices from 'components/Invoices/Invoices';
import NewInvoice from 'components/Invoices/NewInvoice/NewInvoice';
import EditInvoice from 'components/Invoices/EditInvoice/EditInvoice';
import SalesOrders from 'components/SalesOrders/SalesOrders';
import NewSalesOrder from 'components/SalesOrders/NewSalesOrder/NewSalesOrder';
import EditSalesOrder from 'components/SalesOrders/EditSalesOrder/EditSalesOrder';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <PublicRoute component={LoginContainer} path='/' />
        <PublicRoute component={LoginContainer} path='/login' />
        <PublicRoute component={RegisterContainer} path='/register' />

        <PrivateRoute path='/clients' component={Clients} />

        <PrivateRoute path='/products' component={Products} />

        <PrivateRoute path='/invoices' component={Invoices} />
        <PrivateRoute path='/invoices/new' component={NewInvoice} />
        <PrivateRoute path='/invoice/:invoiceId/edit' component={EditInvoice} />

        <PrivateRoute path='/sales-orders' component={SalesOrders} />
        <PrivateRoute path='/sales-order/new' component={NewSalesOrder} />
        <PrivateRoute
          path='/sales-order/:salesOrderId/edit'
          component={EditSalesOrder}
        />
      </Router>
    </div>
  );
};

export default App;
