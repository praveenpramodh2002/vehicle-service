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
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
