import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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



import DashboardSM from './component/PackageManagement/DashboardSM';
import CreationSM from './component/PackageManagement/CreationSM';
import MaintenanceSM from './component/PackageManagement/MaintenanceSM';
import EditPackage from './component/PackageManagement/EditPackage';
import Packages from './component/PackageManagement/Packages';
import PDetails from './component/PackageManagement/PDetails';
import Details from './component/PackageManagement/Details';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/task' element={<TaskManagementUI />} />
        <Route path='/taskForm' element={<TaskForm />} />
        <Route path='/Tasktable' element={<Tasktable />} />
        <Route path='/report' element={<Dashboard />} />
        <Route path='/main' element={<Main />} />
        <Route path='/alltask' element={<Alltask />} />
        <Route path='/tracking' element={<KanbanBoard />} />
        <Route path='/Home1' element={<Home1 />} />
        <Route path='/Modal' element={<Modal />} />
        <Route path='/VehicleForm' element={<AddVehicleForm />} />
        <Route path='/VehicleTable' element={<VehicleTable />} />
        <Route path='/VehicleAddInterface' element={<VehicleManagement />} />
        <Route path='/VehicleUpdateInterface' element={<VehicleUpdate />} />
        <Route path='/addinventory' element={<Sidebar />} />
        <Route path='/inventory' element={<InventoryForm />} />
        <Route path='/InventoryReport' element={<InventoryReport />} />




        <Route path='/p01' element={<DashboardSM />} />
        <Route path="/p3" element={<CreationSM />} />
        <Route path="/p2" element={<MaintenanceSM />} />
        <Route path="/edit-package/:id" element={<EditPackage />} />
        <Route path="/p4" element={<Packages />} />
        <Route path="/p6" element={<PDetails />} />
        <Route path="/p7" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
