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
      
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
