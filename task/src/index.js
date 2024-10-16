import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{BrowserRouter, Route, Routes} from 'react-router-dom'
import TaskManagementUI from './component/taksManagement/addtask';
import TaskForm from './component/taksManagement/taskForm';
import Tasktable from './component/taksManagement/Tasktable';
import Dashboard from './component/taksManagement/home1';
import Main from './component/taksManagement/main';
import Alltask from './component/taksManagement/tasks';
import KanbanBoard from './component/taksManagement/tracking';
import Home from './component/Homepage/hme';

import Home1 from './component/AccountManagement/home';
import Modal from './component/AccountManagement/Modal';
import VehicleManagement from './component/AccountManagement/vehicleAddInterface';
import AddVehicleForm from './component/AccountManagement/vehicleForm';
import VehicleTable from './component/AccountManagement/vehicleTable';
import VehicleUpdate from './component/AccountManagement/vehicleUpdateInterface';

import Sidebar from './component/Inventorymanagement/inventory';
import InventoryForm from './component/Inventorymanagement/inventoryForm';
import InventoryReport from './component/Inventorymanagement/inventoryreport';
import RequestProducts from './component/SupplierManagement/ProductRequestForm';

import Home3 from './component/SupplierManagement/home';
import AddSupplierForm from './component/SupplierManagement/add_sup';
import EditSup from './component/SupplierManagement/edit_sup';
import SupplierReport from './component/SupplierManagement/SupplierReports';
import ViewSup from './component/SupplierManagement/view_sup';
import ProductRequest from './component/SupplierManagement/ProductRequests';

import Services from './component/Appoitment/services';
import Header from './component/Appoitment/Header';
import AddService from './component/Appoitment/addService';
import Booking from './component/Appoitment/Booking';
import Bookings from './component/Appoitment/Bookings';
import CreateBooking from './component/Appoitment/createBooking';
import CustomerRegistration from './component/Appoitment/CustomerRegistration';
import Login from './component/Appoitment/Login';
import PrivateRoute from './component/Appoitment/PrivateRoute';
import Register from './component/Appoitment/Register';
import NavBar from './component/Appoitment/SideNav';
import UpdateBooking from './component/Appoitment/updateBooking';



import AddEmployee from './component/SalaryManagement/addemployee/addemployee';
import EmployeeList from './component/SalaryManagement/employeelist/employeelist';
import EmployeeProfile from './component/SalaryManagement/employeeprofile/employeeprofile';
import UpdateEmployee from './component/SalaryManagement/updateemployee/updateemployee';
import GeneratePayroll from './component/SalaryManagement/generatepayroll/generatepayroll';
import DeletedEmployeeList from './component/SalaryManagement/deletedemployeelist/deletedemployeelist';
import PaysheetList from './component/SalaryManagement/paysheetlist/paysheetlist';   



import DashboardSM from './component/PackageManagement/DashboardSM';
import CreationSM from './component/PackageManagement/CreationSM';
import MaintenanceSM from './component/PackageManagement/MaintenanceSM';
import EditPackage from './component/PackageManagement/EditPackage';
import Packages from './component/PackageManagement/Packages';
import PDetails from './component/PackageManagement/PDetails';
import Details from './component/PackageManagement/Details';
import Bookk from './component/PackageManagement/Bookk';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/task' element={<TaskManagementUI/>}></Route>
        <Route path='/taskForm' element={<TaskForm/>}></Route>
        <Route path='/Tasktable' element={<Tasktable />}></Route>
        <Route path='/report' element={<Dashboard/>}></Route>
        <Route path='/main' element={<Main/>}></Route>
        <Route path='/alltask' element={<Alltask/>}></Route>
        <Route path='/tracking' element={<KanbanBoard/>}></Route>
        <Route path='/Home1' element={<Home1/>}></Route>
        <Route path='/Modal' element={<Modal/>}></Route>
        <Route path='/VehicleForm' element={<AddVehicleForm />} />
      <Route path='/VehicleTable' element={<VehicleTable />} />
      <Route path='/VehicleAddInterface' element={<VehicleManagement />} />
      <Route path='/VehicleUpdateInterface' element={<VehicleUpdate />} />

      <Route path='/addinventory' element={<Sidebar />} />
      <Route path='/inventory' element={<InventoryForm />} />
      <Route path='/InventoryReport' element={<InventoryReport />} />
      <Route path="/requestproducts" element={<RequestProducts />} />

      <Route path='/Home3' element={<Home3 />} />
      <Route path='/AddSupplierForm' element={<AddSupplierForm />} />
      <Route path='/EditSup' element={<EditSup />} />
      <Route path='/ViewSup' element={<ViewSup />} />
      <Route path="/ProductRequests" element={<ProductRequest/>} />
      <Route path="/SupplierReports" element={<SupplierReport />} />
      
      <Route path='/Services' element={<Services />} />
      <Route path='/Header' element={<Header />} />
      <Route path='/AddService' element={<AddService />} />
      <Route path='/Booking' element={<Booking />} />
      <Route path='/Bookings' element={<Bookings />} />
      <Route path='/CreateBooking' element={<CreateBooking />} />
      <Route path='/newCustomer' element={<CustomerRegistration />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/PrivateRoute' element={<PrivateRoute />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/NavBar' element={<NavBar />} />
      <Route path='/UpdateBooking/:id' element={<UpdateBooking />} />

      
      <Route path='/hrmdb' element={<Main/>}/>
      <Route path='/addemployee' element={<AddEmployee/>}/>
      <Route path='/employeelist' element={<EmployeeList/>}/>
      <Route path='/employee/:id' element={<EmployeeProfile/>}/>
      <Route path="/update-employee/:id" element={<UpdateEmployee />} />
      <Route path='/generatepayroll' element={<GeneratePayroll/>}/>
      <Route path='/generatepayroll/:nic' element={<GeneratePayroll/>}/>
      <Route path='/deletedemployees' element={<DeletedEmployeeList/>}/>
      <Route path="/paysheets" element={<PaysheetList />} />

      <Route path='/p01' element={<DashboardSM />} />
        <Route path="/p3" element={<CreationSM />} />
        <Route path="/p2" element={<MaintenanceSM />} />
        <Route path="/edit-package/:id" element={<EditPackage />} />
        <Route path="/p4" element={<Packages />} />
        <Route path="/p6" element={<PDetails />} />
        <Route path="/p7" element={<Details />} />
        <Route path="/p8" element={<Bookk />} />



      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
