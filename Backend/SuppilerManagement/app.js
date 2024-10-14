// app.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './app';
import SupplierManagement from './SupplierManagement'; // Adjust the import paths based on your structure
import DeletedSupplierManagement from './DeletedSupplierManagement'; // Adjust the import paths based on your structure
import ProductRequests from './ProductRequests'; // Import the ProductRequests component

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/suppliers" component={SupplierManagement} />
        <Route path="/deleted-suppliers" component={DeletedSupplierManagement} />
        <Route path="/product-requests" component={ProductRequests} />
        </Switch>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
