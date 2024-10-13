import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardSM.css';

export default function DashboardSM() {
  return (
<div className="dashboard-container">
      <header className="dashboard-header">
       
        <h1 className="dashboard-title">Manager Dashboard</h1>
      </header>
      
    <div className="dashboard-cards">
  <Link to="/p3" className="card-link">
    <div className="card">
      <img src="/image/package-creation-icon.png" alt="Package Creation" className="card-icon" />
      <p>Package Creation</p>
    </div>
  </Link>

  <Link to="/p2" className="card-link">
    <div className="card">
      <img src="/image/package-maintenance-icon.png" alt="Package Maintenance" className="card-icon" />
      <p className="highlighted">Package Maintenance</p>
    </div>
  </Link>

  <Link to="/p4" className="card-link">
    <div className="card">
      <img src="/image/packages-icon.png" alt="Packages" className="card-icon" />
      <p>Packages</p>
    </div>
  </Link>
</div>
</div>
  );
}
